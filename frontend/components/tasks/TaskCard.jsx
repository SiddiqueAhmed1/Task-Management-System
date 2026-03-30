"use client";
import { MoreVertical, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  LOW: "bg-slate-500/20 text-slate-400 border-slate-500/20",
  MEDIUM: "bg-yellow-500/20 text-yellow-400 border-yellow-500/20",
  HIGH: "bg-red-500/20 text-red-400 border-red-500/20",
};

const statusOptions = ["PENDING", "IN_PROGRESS", "COMPLETED"];

export default function TaskCard({ task, onEdit, onRefresh }) {
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
    <Card className="border-border/50 hover:border-primary/20 transition-all group">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-snug flex-1">{task.name}</p>
          {onEdit && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0"
                >
                  <MoreVertical size={12} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Pencil size={13} className="mr-2" /> Edit
                </DropdownMenuItem>
                {statusOptions
                  .filter((s) => s !== task.status)
                  .map((s) => (
                    <DropdownMenuItem
                      key={s}
                      onClick={() => handleStatusChange(s)}
                    >
                      Move to {s.replace("_", " ")}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {task.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-3">
          <Badge
            variant="outline"
            className={`text-xs ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
