import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: product.id,
      name: product.name,
      category: product.category.name,
      categoryId: product.categoryId,
      price: product.price,
      stock: product.stock,
      sku: product.sku || `SKU-${product.id.slice(0, 8).toUpperCase()}`,
      description: product.description || "",
      image: product.image || "",
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, category: categoryName, categoryId, price, stock, sku, description, image } = body;

    let finalCategoryId = categoryId;
    if (!finalCategoryId && categoryName) {
      const cat = await prisma.category.upsert({
        where: { name: categoryName },
        update: {},
        create: { name: categoryName },
      });
      finalCategoryId = cat.id;
    }

    const dataToUpdate: any = {};
    if (name !== undefined) dataToUpdate.name = name;
    if (finalCategoryId !== undefined) dataToUpdate.categoryId = Number(finalCategoryId);
    if (price !== undefined) dataToUpdate.price = parseInt(price, 10);
    if (stock !== undefined) dataToUpdate.stock = parseInt(stock, 10);
    if (sku !== undefined) dataToUpdate.sku = sku;
    if (description !== undefined) dataToUpdate.description = description;
    if (image !== undefined) dataToUpdate.image = image;

    const updated = await prisma.product.update({
      where: { id },
      data: dataToUpdate,
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      category: updated.category.name,
      categoryId: updated.categoryId,
      price: updated.price,
      stock: updated.stock,
      sku: updated.sku,
      description: updated.description,
      image: updated.image,
      updatedAt: updated.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
