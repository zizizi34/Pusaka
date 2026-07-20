"use client";

import React, { useState } from "react";
import { User, Bell, Lock, Globe } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "general", label: "General", icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#18211a] sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[#6b7280]">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  activeTab === tab.id 
                    ? "bg-[#607456] text-white" 
                    : "text-[#4b5563] hover:bg-[#f4f6f1] hover:text-[#18211a]"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="flex-1 rounded-[28px] border border-[#ecece6] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#18211a]">Profile Information</h2>
              <div className="grid gap-5 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-[#18211a] mb-1.5">Full Name</label>
                  <input type="text" defaultValue="Administrator" className="w-full px-4 py-2.5 rounded-xl border border-[#ecece6] focus:border-[#607456] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#18211a] mb-1.5">Email Address</label>
                  <input type="email" defaultValue="admin@pusaka.com" className="w-full px-4 py-2.5 rounded-xl border border-[#ecece6] focus:border-[#607456] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#18211a] mb-1.5">Role</label>
                  <input type="text" disabled defaultValue="Super Admin" className="w-full px-4 py-2.5 rounded-xl border border-[#ecece6] bg-[#fafaf8] text-[#6b7280] cursor-not-allowed" />
                </div>
                <div className="pt-4">
                  <button className="rounded-xl bg-[#18211a] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2c3b2e]">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab !== "profile" && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-lg font-semibold text-[#18211a] capitalize">
                {tabs.find(t => t.id === activeTab)?.label || activeTab} Settings
              </h3>
              <p className="text-sm text-[#6b7280] mt-2">These settings are currently being integrated.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
