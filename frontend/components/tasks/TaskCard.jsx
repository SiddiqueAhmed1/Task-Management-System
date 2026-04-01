"use client";
import {
  BadgeAlert,
  CircleCheck,
  Clock,
  DeleteIcon,
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
  PENDING: <Clock size={20} color="#ff0066" />,
  COMPLETED: <CircleCheck size={20} color="#00ff6e" />,
  IN_PROGRESS: <BadgeAlert size={20} color="#ffc800" />,
};

export default function TaskCard({ task, onEdit, onRefresh }) {
  const handleTaskDelete = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      toast.success("Task deleted");
      onRefresh?.();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleStatusChange = async (status) => {
    try {
      console.log("status from status chane", status);

      await api.patch(`/tasks/${task.id}`, { status });
      toast.success("Status updated");
      onRefresh?.();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="shadow-md  flex items-center gap-4 px-4 py-4 rounded-lg border hover:border-green-900 bg-white border-primary/20 transition-all group">
      {/* Name + Description */}
      <div className="flex-1  ">
        <div className="flex items-center gap-3">
          <div>{statusIcon[task.status]}</div>
          <div>
            <p className="text-lg font-medium truncate">{task.name}</p>
            {task.description && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {task.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {task.dueDate ? (
        <span>{task.dueDate.toLocaleString().split("T")[0]}</span>
      ) : (
        ""
      )}

      {/* Badges */}
      <div className="flex items-center gap-2 shrink-0">
        <Badge
          variant="outline"
          className={`text-xs ${statusColors[task.status]}`}
        >
          {task.status.replace("_", " ")}
        </Badge>
        <Badge
          variant="outline"
          className={`text-xs ${priorityColors[task.priority]}`}
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
              className="h-7 w-7 opacity-0 group-hover:opacity-100 shrink-0"
            >
              <MoreVertical size={13} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Pencil size={13} /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleTaskDelete}>
              <Trash2 />
              Delete
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
