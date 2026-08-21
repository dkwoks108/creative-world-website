import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-panel flex h-screen bg-[#090D14] overflow-hidden text-white font-sans">
      {/* Sidebar */}
      <div className="h-full">
        <AdminSidebar />
      </div>

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <AdminHeader />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#090D14] scrollbar-thin scrollbar-thumb-white/10">
          <div className="py-8 px-6 md:px-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
