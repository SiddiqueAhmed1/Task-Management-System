"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskList from "@/components/tasks/TaskList";
import TaskForm from "@/components/tasks/TaskForm";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import api from "@/lib/api";
import { toast } from "sonner";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchData = async () => {
    try {
      const [projRes, tasksRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/tasks?projectId=${id}`),
      ]);
      setProject(projRes.data.singleProject || projRes.data);
      setTasks(Array.isArray(tasksRes.data) ? tasksRes.data : []);
    } catch {
      toast.error("Failed to load project data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleTaskSuccess = () => {
    setOpen(false);
    setEditTask(null);
    fetchData();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{project?.name || "Project"}</h1>
          <p className="text-muted-foreground">
            {project?.description || "No description"}
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditTask(null)}>
              <Plus size={16} className="mr-2" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editTask ? "Edit Task" : "Create Task"}
              </DialogTitle>
            </DialogHeader>
            <TaskForm
              task={editTask}
              projectId={id}
              onSuccess={handleTaskSuccess}
              onCancel={() => {
                setOpen(false);
                setEditTask(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <TaskList
        tasks={tasks}
        onEdit={(t) => {
          setEditTask(t);
          setOpen(true);
        }}
        onRefresh={fetchData}
      />
    </div>
  );
}
