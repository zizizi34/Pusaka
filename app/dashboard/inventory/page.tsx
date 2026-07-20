import React from "react";
import { Warehouse, Filter, AlertTriangle, ArrowUpRight } from "lucide-react";

export default function InventoryPage() {
  const dummyInventory = [
    { id: 1, name: "Batik Premium", sku: "BTK-001", stock: 15, status: "Low Stock", location: "Warehouse A" },
    { id: 2, name: "Tenun Ikat", sku: "TNN-023", stock: 120, status: "In Stock", location: "Warehouse B" },
    { id: 3, name: "Kerajinan Kayu", sku: "KRJ-101", stock: 4, status: "Critical", location: "Store Front" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#18211a] sm:text-3xl">
            Inventory Management
          </h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Monitor your stock levels across all locations.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-[#e5e8df] bg-white px-4 py-2 text-sm font-medium text-[#4b5563] hover:border-[#607456] transition-colors">
          <Filter size={15} />
          Filter view
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {[
          { title: "Total Items", value: "1,248", trend: "+12%" },
          { title: "Low Stock Alerts", value: "12", trend: "-2", warning: true },
          { title: "Out of Stock", value: "3", trend: "0" },
        ].map((stat, i) => (
          <div key={i} className="rounded-[20px] border border-[#ecece6] bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-[#6b7280]">{stat.title}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-2xl font-semibold text-[#18211a]">{stat.value}</p>
              <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${stat.warning ? 'bg-red-50 text-red-600' : 'bg-[#f4f6f1] text-[#607456]'}`}>
                <ArrowUpRight size={12} /> {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-[#ecece6] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        <div className="overflow-hidden rounded-xl border border-[#ecece6]">
          <table className="min-w-full divide-y divide-[#f0f0ec] text-sm">
            <thead className="bg-[#fafaf8] text-left text-[#6b7280]">
              <tr>
                <th className="px-4 py-3 font-semibold">Product Name</th>
                <th className="px-4 py-3 font-semibold">SKU</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0ec] bg-white">
              {dummyInventory.map((item) => (
                <tr key={item.id} className="transition hover:bg-[#fafaf8]">
                  <td className="px-4 py-3 font-medium text-[#18211a]">{item.name}</td>
                  <td className="px-4 py-3 text-[#6b7280]">{item.sku}</td>
                  <td className="px-4 py-3 text-[#6b7280]">{item.location}</td>
                  <td className="px-4 py-3 font-semibold text-[#18211a]">{item.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      item.status === 'In Stock' ? 'bg-[#ecfdf3] text-[#166534]' : 
                      item.status === 'Low Stock' ? 'bg-[#fff7ed] text-[#c2410c]' : 'bg-[#fef2f2] text-[#b91c1c]'
                    }`}>
                      {item.status === 'Critical' && <AlertTriangle size={12} />}
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
