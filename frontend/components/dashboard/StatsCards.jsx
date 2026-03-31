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
      } finally {
        setLoading(false);
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

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statConfig.map(({ key, label, icon: Icon, color }) => (
          <Card
            key={key}
            className="border-border/50 shadow-md hover:border-primary/30 transition-colors"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg  text-neutral-600 ">
                {label}
              </CardTitle>
              <Icon size={25} className={color} />
            </CardHeader>
            <CardContent>
              {/* api key and stat key must be same */}
              <p className="text-3xl font-bold">{stats[key] || 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* recent project */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <Card className={"shadow"}>
          <CardHeader>
            <CardTitle className={"text-2xl font-semibold text-neutral-800"}>
              Recent Projects
            </CardTitle>
            <CardDescription className={"text-md"}>
              Your most recent projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <p className="text-muted-foreground text-sm">No projects yet</p>
            ) : (
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <FolderKanban
                          color="blue"
                          className="h-5 w-5 text-primary"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{project.name}</p>
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

        {/* task over view */}
        <Card className={"shadow"}>
          <CardHeader>
            <CardTitle className={"text-2xl font-semibold text-neutral-800"}>
              Task Overview
            </CardTitle>
            <CardDescription className={"text-md"}>
              Your task completion progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <span className="text-sm text-muted-foreground">
                    {stats.totalTask > 0
                      ? Math.round(
                          (stats.completedTask / stats.totalTask) * 100,
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{
                      width: `${
                        stats.totalTask > 0
                          ? (stats.completedTask / stats.totalTask) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-2xl font-bold text-green-700">
                    {stats.completedTask | 0}
                  </p>
                  <p className="text-xs text-green-600">Completed</p>
                </div>

                <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-2xl font-bold text-blue-700">
                    {stats.inProgressTask | 0}
                  </p>
                  <p className="text-xs text-blue-600">In Progress</p>
                </div>

                <div className="text-center p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <p className="text-2xl font-bold text-amber-700">
                    {stats.pendingTask | 0}
                  </p>
                  <p className="text-xs text-amber-600">Pending</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
