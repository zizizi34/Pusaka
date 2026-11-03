import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { stock } = body;

    if (stock === undefined || isNaN(Number(stock))) {
      return NextResponse.json(
        { error: "Nilai stock tidak valid" },
        { status: 400 }
      );
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        stock: Math.max(0, parseInt(stock, 10)),
      },
      select: {
        id: true,
        name: true,
        stock: true,
        price: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      message: "Stock berhasil diperbarui",
      product: updated,
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui stock" },
      { status: 500 }
    );
  }
}
