import StatsCards from "@/components/dashboard/StatsCards";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className={"text-3xl font-semibold text-neutral-800"}>Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your overview.
        </p>
      </div>
      <StatsCards />
    </div>
  );
}
