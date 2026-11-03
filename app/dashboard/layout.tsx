import { redirect } from "next/navigation";
import AdminDashboardShell from "@/components/AdminDashboardShell";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
