import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format for easier frontend usage
    const formatted = products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category.name,
      categoryId: p.categoryId,
      price: p.price,
      stock: p.stock,
      sku: p.sku || `SKU-${p.id.slice(0, 8).toUpperCase()}`,
      description: p.description || "",
      image: p.image || "",
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, category: categoryName, categoryId, price, stock, sku, description, image } = body;

    if (!name || price === undefined) {
      return NextResponse.json(
        { error: "Nama dan harga produk wajib diisi" },
        { status: 400 }
      );
    }

    let finalCategoryId = categoryId;
    if (!finalCategoryId && categoryName) {
      const cat = await prisma.category.upsert({
        where: { name: categoryName },
        update: {},
        create: { name: categoryName },
      });
      finalCategoryId = cat.id;
    }

    if (!finalCategoryId) {
      // default category
      const firstCat = await prisma.category.findFirst();
      finalCategoryId = firstCat?.id || 1;
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        categoryId: Number(finalCategoryId),
        price: parseInt(price, 10),
        stock: parseInt(stock ?? 0, 10),
        sku: sku || `SKU-${Date.now().toString().slice(-6)}`,
        description: description || "",
        image: image || "",
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      id: newProduct.id,
      name: newProduct.name,
      category: newProduct.category.name,
      categoryId: newProduct.categoryId,
      price: newProduct.price,
      stock: newProduct.stock,
      sku: newProduct.sku,
      description: newProduct.description,
      image: newProduct.image,
      createdAt: newProduct.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
