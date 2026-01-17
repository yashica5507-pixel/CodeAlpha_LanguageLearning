import { DashboardOverview } from '@/components/dashboard-overview';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's a snapshot of your language learning journey.
        </p>
      </div>
      <DashboardOverview />
    </div>
  );
}
