import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  CircleDollarSign,
  Package,
  PackagePlus,
  Warehouse,
} from "lucide-react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const formatNumber = new Intl.NumberFormat("id-ID");
const formatDate = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const LOW_STOCK_THRESHOLD = 5;

export default async function DashboardPage() {
  await connection();

  const [totalProducts, totalCategories, inventory, recentProducts, categories] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.product.findMany({
        select: { price: true, stock: true },
      }),
      prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          sku: true,
          price: true,
          stock: true,
          createdAt: true,
          category: { select: { name: true } },
        },
      }),
      prisma.category.findMany({
        select: {
          id: true,
          name: true,
          _count: { select: { products: true } },
        },
        orderBy: { name: "asc" },
      }),
    ]);

  const totalStock = inventory.reduce((total, product) => total + product.stock, 0);
  const inventoryValue = inventory.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  );
  const lowStockProducts = inventory.filter(
    (product) => product.stock <= LOW_STOCK_THRESHOLD,
  ).length;
  const outOfStockProducts = inventory.filter((product) => product.stock === 0).length;
  const topCategories = [...categories]
    .sort((first, second) => second._count.products - first._count.products)
    .slice(0, 5);

  const stats = [
    {
      label: "Total produk",
      value: formatNumber.format(totalProducts),
      detail: "Produk tersimpan di katalog",
      icon: Package,
      iconClass: "bg-[#edf3e8] text-[#4c6640]",
    },
    {
      label: "Kategori",
      value: formatNumber.format(totalCategories),
      detail: "Kelompok produk",
      icon: Boxes,
      iconClass: "bg-[#f6efe4] text-[#a66c32]",
    },
    {
      label: "Total stok",
      value: formatNumber.format(totalStock),
      detail: `${formatNumber.format(outOfStockProducts)} produk habis`,
      icon: Warehouse,
      iconClass: "bg-[#edf2f7] text-[#49637d]",
    },
    {
      label: "Nilai persediaan",
      value: formatCurrency.format(inventoryValue),
      detail: "Harga produk × jumlah stok",
      icon: CircleDollarSign,
      iconClass: "bg-[#eef7ef] text-[#47744b]",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl bg-[#344633] px-5 py-6 text-white sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-1 top-8 h-40 w-40 rounded-full border border-white/[0.07]" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/60">
              Ringkasan toko
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-[30px]">
              Semua dalam kendali.
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-white/70">
              Pantau produk, persediaan, dan nilai inventaris toko Anda dari satu tempat.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/inventory"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Warehouse size={16} />
              Lihat persediaan
            </Link>
            <Link
              href="/dashboard/products/new"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#344633] transition hover:bg-[#f1f3ed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#344633]"
            >
              <PackagePlus size={16} />
              Tambah produk
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-label="Statistik katalog dan persediaan"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-xl border border-[#e7eae2] bg-white p-4 sm:p-5"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.iconClass}`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#788174]">{stat.label}</p>
                  <p className="mt-1 break-words text-xl font-semibold tracking-tight text-[#202820]">
                    {stat.value}
                  </p>
                </div>
              </div>
              <p className="mt-3 border-t border-[#f0f2ed] pt-3 text-xs text-[#899286]">
                {stat.detail}
              </p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
        <article className="min-w-0 rounded-xl border border-[#e7eae2] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf0ea] px-5 py-4 sm:px-6">
            <div>
              <h3 className="text-sm font-semibold text-[#273127]">Produk terbaru</h3>
              <p className="mt-1 text-xs text-[#899286]">
                Produk yang baru ditambahkan ke katalog
              </p>
            </div>
            <Link
              href="/dashboard/products"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-[#55734b] transition hover:bg-[#f3f6f0]"
            >
              Lihat semua
              <ArrowRight size={15} />
            </Link>
          </div>

          {recentProducts.length === 0 ? (
            <div className="px-5 py-12 text-center sm:px-8">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2f5ef] text-[#718563]">
                <Package size={21} />
              </span>
              <p className="mt-4 text-sm font-semibold text-[#354034]">Belum ada produk</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-[#7a8276]">
                Tambahkan produk pertama untuk mulai mengelola persediaan.
              </p>
              <Link
                href="/dashboard/products/new"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#607456] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-[#526342]"
              >
                <PackagePlus size={16} />
                Tambah produk
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-[#fafbf9] text-[10px] uppercase tracking-[0.08em] text-[#879083]">
                  <tr>
                    <th className="px-5 py-3 font-semibold sm:px-6">Produk</th>
                    <th className="px-4 py-3 font-semibold">Kategori</th>
                    <th className="px-4 py-3 font-semibold">Stok</th>
                    <th className="px-4 py-3 font-semibold">Harga</th>
                    <th className="px-5 py-3 font-semibold sm:px-6">Ditambahkan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f2ed]">
                  {recentProducts.map((product) => {
                    const isLowStock = product.stock <= LOW_STOCK_THRESHOLD;

                    return (
                      <tr key={product.id} className="transition-colors hover:bg-[#fafbf9]">
                        <td className="px-5 py-3.5 sm:px-6">
                          <p className="font-medium text-[#303a30]">{product.name}</p>
                          <p className="mt-0.5 text-[11px] text-[#929b8f]">
                            {product.sku || "SKU belum diatur"}
                          </p>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-[#626b60]">
                          {product.category.name}
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex rounded-md px-2 py-1 text-[11px] font-semibold ${
                              isLowStock
                                ? "bg-[#fff4e8] text-[#a95016]"
                                : "bg-[#edf5eb] text-[#397044]"
                            }`}
                          >
                            {formatNumber.format(product.stock)} unit
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-xs font-medium text-[#465044]">
                          {formatCurrency.format(product.price)}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-xs text-[#727b6f] sm:px-6">
                          {formatDate.format(product.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <div className="space-y-4">
          <article className="rounded-xl border border-[#f0dfc9] bg-[#fffaf4] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#a66c32]">
                  Perhatian stok
                </p>
                <h3 className="mt-2 text-sm font-semibold text-[#40372c]">
                  Perlu diperiksa
                </h3>
                <p className="mt-1 text-xs leading-5 text-[#8a7966]">
                  Produk dengan stok lima unit atau kurang
                </p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f8ead8] text-[#a66c32]">
                <AlertTriangle size={17} />
              </span>
            </div>
            <p className="mt-5 text-3xl font-semibold tracking-tight text-[#352f27]">
              {formatNumber.format(lowStockProducts)}
              <span className="ml-2 text-xs font-medium text-[#8a7966]">produk perlu perhatian</span>
            </p>
            <Link
              href="/dashboard/inventory"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8f5b27] hover:text-[#70451e]"
            >
              Periksa persediaan
              <ArrowRight size={15} />
            </Link>
          </article>

          <article className="rounded-xl border border-[#e7eae2] bg-white p-5">
            <div>
              <h3 className="text-sm font-semibold text-[#303a30]">Kategori produk</h3>
              <p className="mt-1 text-xs text-[#899286]">
                Sebaran produk dalam katalog
              </p>
            </div>

            {topCategories.length === 0 ? (
              <p className="mt-4 rounded-lg bg-[#f8f9f6] p-4 text-xs leading-5 text-[#7a8276]">
                Belum ada kategori untuk ditampilkan.
              </p>
            ) : (
              <ul className="mt-5 space-y-4">
                {topCategories.map((category) => {
                  const percentage =
                    totalProducts === 0
                      ? 0
                      : Math.round((category._count.products / totalProducts) * 100);

                  return (
                    <li key={category.id}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                        <span className="truncate font-medium text-[#465044]">
                          {category.name}
                        </span>
                        <span className="shrink-0 text-[11px] text-[#7a8276]">
                          {formatNumber.format(category._count.products)} (
                          {formatNumber.format(percentage)}%)
                        </span>
                      </div>
                      <div
                        className="h-1.5 overflow-hidden rounded-full bg-[#edf0ea]"
                        role="progressbar"
                        aria-label={`Proporsi produk kategori ${category.name}`}
                        aria-valuenow={percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="h-full rounded-full bg-[#718563]"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <Link
              href="/dashboard/categories"
              className="mt-5 inline-flex items-center gap-1.5 border-t border-[#f0f2ed] pt-4 text-xs font-semibold text-[#55734b] transition-colors hover:text-[#3d5c35]"
            >
              Kelola kategori
              <ArrowRight size={15} />
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}
