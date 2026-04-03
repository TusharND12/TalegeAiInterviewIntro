import { AppSidebar } from "@/components/layout/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/20">
        <div className="container mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
