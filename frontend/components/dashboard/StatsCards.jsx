"use client";
import { useEffect, useState } from "react";
import { FolderKanban, ListTodo, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const statConfig = [
  {
    key: "totalProjects",
    label: "Total Projects",
    icon: FolderKanban,
    color: "text-blue-400",
  },
  {
    key: "totalTask",
    label: "Total Tasks",
    icon: ListTodo,
    color: "text-purple-400",
  },
  {
    key: "completedTask",
    label: "Completed",
    icon: CheckCircle2,
    color: "text-green-400",
  },
  {
    key: "pendingTask",
    label: "Pending",
    icon: Clock,
    color: "text-orange-400",
  },
];

export default function StatsCards() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard");
        setStats(res.data.data || res.data);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statConfig.map(({ key, label, icon: Icon, color }) => (
        <Card
          key={key}
          className="border-border/50 hover:border-primary/30 transition-colors"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {label}
            </CardTitle>
            <Icon size={18} className={color} />
          </CardHeader>
          <CardContent>
            {/* api key and stat key must be same */}
            <p className="text-3xl font-bold">{stats[key] || 0}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
