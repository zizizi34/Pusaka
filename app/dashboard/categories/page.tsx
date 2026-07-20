import React from "react";
import { prisma } from "@/lib/prisma";
import { Boxes, Plus, Search } from "lucide-react";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#18211a] sm:text-3xl">
            Categories
          </h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Manage and organize your product categories.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#607456] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#526342]">
            <Plus size={15} />
            Add Category
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="rounded-[28px] border border-[#ecece6] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        <div className="mb-6 flex items-center justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full rounded-xl border border-[#ecece6] bg-[#fafaf8] py-2 pl-10 pr-4 text-sm text-[#18211a] placeholder:text-[#aab8a2] focus:border-[#607456] focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aab8a2]" size={16} />
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f4f6f1] text-[#607456] mb-4">
              <Boxes size={32} />
            </div>
            <h3 className="text-lg font-semibold text-[#18211a]">No categories found</h3>
            <p className="mt-1 text-sm text-[#6b7280]">
              Get started by creating a new category for your products.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#ecece6]">
            <table className="min-w-full divide-y divide-[#f0f0ec] text-sm">
              <thead className="bg-[#fafaf8] text-left text-[#6b7280]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Created At</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0ec] bg-white">
                {categories.map((cat) => (
                  <tr key={cat.id} className="transition hover:bg-[#fafaf8]">
                    <td className="px-4 py-3 font-medium text-[#18211a]">{cat.name}</td>
                    <td className="px-4 py-3 text-[#6b7280]">
                      {cat.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-sm font-medium text-[#607456] hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
