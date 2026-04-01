"use client";
import { useEffect, useState } from "react";
import { FolderKanban, ListTodo, CheckCircle2, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { toast } from "sonner";

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
  const [recentProjects, setRecentProjects] = useState([]);

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

    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setRecentProjects(res.data);
      } catch {
        toast.error("Failed to load projects");
      }
    };

    fetchStats();
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <LoadingSpinner />
      </div>
    );
  }

  const completionRate =
    stats.totalTask > 0
      ? Math.round((stats.completedTask / stats.totalTask) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statConfig.map(({ key, label, icon: Icon, color }) => (
          <Card
            key={key}
            className="border-border/50 shadow-md hover:border-primary/30 transition-colors"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon size={18} className={color} />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <p className="text-2xl sm:text-3xl font-bold">
                {stats[key] || 0}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Projects */}
        <Card className="shadow">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold">
              Recent Projects
            </CardTitle>
            <CardDescription>Your most recent projects</CardDescription>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <p className="text-muted-foreground text-sm">No projects yet</p>
            ) : (
              <div className="space-y-3">
                {recentProjects.slice(0, 5).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 shrink-0 rounded-md bg-primary/10 flex items-center justify-center">
                        <FolderKanban className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">
                          {project.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Task Overview */}
        <Card className="shadow">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold">
              Task Overview
            </CardTitle>
            <CardDescription>Your task completion progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <span className="text-sm text-muted-foreground">
                    {completionRate}%
                  </span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>

              {/* Task Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
                <div className="text-center p-2 sm:p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-xl sm:text-2xl font-bold text-green-400">
                    {stats.completedTask || 0}
                  </p>
                  <p className="text-xs text-green-500 mt-0.5">Completed</p>
                </div>
                <div className="text-center p-2 sm:p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-xl sm:text-2xl font-bold text-blue-400">
                    {stats.inProgressTask || 0}
                  </p>
                  <p className="text-xs text-blue-500 mt-0.5">In Progress</p>
                </div>
                <div className="text-center p-2 sm:p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xl sm:text-2xl font-bold text-amber-400">
                    {stats.pendingTask || 0}
                  </p>
                  <p className="text-xs text-amber-500 mt-0.5">Pending</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
