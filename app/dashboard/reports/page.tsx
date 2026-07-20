import React from "react";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#18211a] sm:text-3xl">
            Analytics & Reports
          </h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Insights and metrics for your business growth.
          </p>
        </div>
        <select className="rounded-xl border border-[#ecece6] bg-white px-4 py-2 text-sm font-medium text-[#18211a] focus:outline-none">
          <option>Last 30 Days</option>
          <option>This Quarter</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Gross Revenue", value: "Rp 45.2M", icon: DollarSign, trend: "+14.2%" },
          { title: "Total Orders", value: "342", icon: BarChart3, trend: "+8.1%" },
          { title: "Active Customers", value: "128", icon: Users, trend: "+4.3%" },
          { title: "Conversion Rate", value: "3.2%", icon: TrendingUp, trend: "+1.2%" },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="rounded-[24px] border border-[#ecece6] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4f6f1] text-[#607456]">
                  <Icon size={18} />
                </div>
                <p className="text-sm font-medium text-[#6b7280]">{card.title}</p>
              </div>
              <p className="text-3xl font-bold text-[#18211a]">{card.value}</p>
              <p className="mt-2 text-sm font-medium text-[#607456]">{card.trend} vs last period</p>
            </div>
          )
        })}
      </div>

      <div className="rounded-[28px] border border-[#ecece6] bg-white p-8 min-h-[400px] flex items-center justify-center flex-col text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
        <BarChart3 size={48} className="text-[#e5e8df] mb-4" />
        <h3 className="text-lg font-semibold text-[#18211a]">Detailed charts are being generated</h3>
        <p className="text-sm text-[#6b7280] max-w-md mt-2">
          We are currently aggregating your historical data to display interactive revenue and visitor charts.
        </p>
      </div>
    </div>
  );
}
