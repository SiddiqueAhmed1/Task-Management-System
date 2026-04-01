"use client";
import {
  BadgeAlert,
  CircleCheck,
  Clock,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/api";
import { toast } from "sonner";

const priorityColors = {
  LOW: "bg-yellow-600 text-black border-emerald-800 p-3",
  MEDIUM: "bg-amber-800 text-amber-400 border-amber-800 p-3",
  HIGH: "bg-rose-700 text-black border-rose-800 p-3",
};

const statusColors = {
  PENDING: "bg-orange700 text-orange-500 p-3 border-orange-800",
  IN_PROGRESS: "bg-sky-100 text-sky-500 p-3 border-sky-800",
  COMPLETED: "bg-teal-800 text-teal-400 p-3 border-teal-800",
};

const statusOptions = ["PENDING", "IN_PROGRESS", "COMPLETED"];

const statusIcon = {
  PENDING: <Clock size={18} className="text-orange-400 shrink-0" />,
  COMPLETED: <CircleCheck size={18} className="text-teal-400 shrink-0" />,
  IN_PROGRESS: <BadgeAlert size={18} className="text-sky-400 shrink-0" />,
};

export default function TaskCard({ task, onEdit, onRefresh }) {
  const handleTaskDelete = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      toast.success("Task deleted");
      onRefresh?.();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleStatusChange = async (status) => {
    try {
      await api.patch(`/tasks/${task.id}`, { status });
      toast.success("Status updated");
      onRefresh?.();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className=" flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-lg border border-border/50 bg-card hover:border-primary/20 transition-all group min-h-[64px]  shadow">
      {/* Status Icon */}
      <div className="shrink-0">{statusIcon[task.status]}</div>

      {/* Name + Description */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${task.status === "COMPLETED" ? "line-through text-muted-foreground" : ""}`}
        >
          {task.name}
        </p>
        {task.description && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {task.description}
          </p>
        )}
      </div>

      {/* Due Date — hidden on small mobile */}
      {task.dueDate && (
        <span className="hidden sm:block text-xs text-muted-foreground shrink-0 whitespace-nowrap">
          Due: {task.dueDate.split("T")[0]}
        </span>
      )}

      {/* Badges — status hidden on mobile */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <Badge
          variant="outline"
          className={`hidden sm:flex text-xs px-2 py-0.5 ${statusColors[task.status]}`}
        >
          {task.status.replace("_", " ")}
        </Badge>
        <Badge
          variant="outline"
          className={`text-xs px-2 py-0.5 ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </Badge>
      </div>

      {/* Actions */}
      {onEdit && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 md:opacity-0 md:group-hover:opacity-100 shrink-0"
            >
              <MoreVertical size={13} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Pencil size={13} className="mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleTaskDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 size={13} className="mr-2" /> Delete
            </DropdownMenuItem>
            {statusOptions
              .filter((s) => s !== task.status)
              .map((s) => (
                <DropdownMenuItem key={s} onClick={() => handleStatusChange(s)}>
                  Move to {s.replace("_", " ")}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
