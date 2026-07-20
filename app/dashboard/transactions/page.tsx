import React from "react";
import { Search, Download, ExternalLink } from "lucide-react";

export default function TransactionsPage() {
  const dummyTransactions = [
    { id: "TRX-9821", customer: "Budi Santoso", date: "20 Jul 2026", amount: "Rp 1.250.000", status: "Completed" },
    { id: "TRX-9822", customer: "Siti Aminah", date: "20 Jul 2026", amount: "Rp 450.000", status: "Processing" },
    { id: "TRX-9823", customer: "John Doe", date: "19 Jul 2026", amount: "Rp 2.100.000", status: "Completed" },
    { id: "TRX-9824", customer: "Ayu Lestari", date: "19 Jul 2026", amount: "Rp 750.000", status: "Refunded" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#18211a] sm:text-3xl">
            Transactions
          </h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Review all your incoming orders and payments.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[#18211a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#2c3b2e] transition-colors">
          <Download size={15} />
          Export CSV
        </button>
      </div>

      <div className="rounded-[28px] border border-[#ecece6] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search order ID or customer name..."
              className="w-full rounded-xl border border-[#ecece6] bg-[#fafaf8] py-2 pl-10 pr-4 text-sm focus:border-[#18211a] focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aab8a2]" size={16} />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#ecece6]">
          <table className="min-w-full divide-y divide-[#f0f0ec] text-sm">
            <thead className="bg-[#fafaf8] text-left text-[#6b7280]">
              <tr>
                <th className="px-4 py-3 font-semibold">Transaction ID</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0ec] bg-white">
              {dummyTransactions.map((trx) => (
                <tr key={trx.id} className="transition hover:bg-[#fafaf8]">
                  <td className="px-4 py-3 font-medium text-[#18211a]">{trx.id}</td>
                  <td className="px-4 py-3 text-[#4b5563]">{trx.customer}</td>
                  <td className="px-4 py-3 text-[#6b7280]">{trx.date}</td>
                  <td className="px-4 py-3 font-semibold text-[#18211a]">{trx.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      trx.status === 'Completed' ? 'bg-[#ecfdf3] text-[#166534]' : 
                      trx.status === 'Processing' ? 'bg-[#e0f2fe] text-[#0369a1]' : 'bg-[#fef2f2] text-[#b91c1c]'
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[#aab8a2] hover:text-[#18211a] transition-colors">
                      <ExternalLink size={16} />
                    </button>
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
