import Header from "@/components/shared/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
