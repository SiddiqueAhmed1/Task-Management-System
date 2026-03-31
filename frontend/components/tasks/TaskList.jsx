"use client";
import { useState } from "react";
import TaskCard from "./TaskCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TaskList({ tasks, onEdit, onRefresh }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const filtered = (tasks || []).filter((task) => {
    const matchSearch = task.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || task.status === statusFilter;
    const matchPriority =
      priorityFilter === "ALL" || task.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div className="space-y-4">
      {/* Search + Filter */}
      <div className="flex gap-3">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-[2] h-10 text-md border border-neutral-400"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="flex-1 py-5 border border-neutral-400">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="flex-1 py-5 border border-neutral-400">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Priority</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Task List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No tasks found.</p>
          <p className="text-sm">Try changing your search or filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onRefresh={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}
