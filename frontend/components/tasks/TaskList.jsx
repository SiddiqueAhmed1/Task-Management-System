"use client";
import TaskCard from "./TaskCard";

const STATUS_ORDER = ["PENDING", "IN_PROGRESS", "COMPLETED"];

export default function TaskList({ tasks, onEdit, onRefresh }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="text-lg">No tasks yet.</p>
        <p className="text-sm">Add a task to get started.</p>
      </div>
    );
  }

  const grouped = STATUS_ORDER.reduce((acc, s) => {
    acc[s] = tasks.filter((t) => t.status === s);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {STATUS_ORDER.map((status) => (
        <div key={status}>
          <div className="flex items-center gap-2 mb-3">
            <StatusDot status={status} />
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {status.replace("_", " ")}
            </h3>
            <span className="ml-auto text-xs bg-secondary px-2 py-0.5 rounded-full">
              {grouped[status].length}
            </span>
          </div>
          <div className="space-y-3">
            {grouped[status].map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onRefresh={onRefresh}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusDot({ status }) {
  const colors = {
    PENDING: "bg-orange-400",
    IN_PROGRESS: "bg-blue-400",
    COMPLETED: "bg-green-400",
  };
  return <div className={`w-2 h-2 rounded-full ${colors[status]}`} />;
}
