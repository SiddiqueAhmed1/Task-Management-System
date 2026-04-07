"use client";
import Link from "next/link";
import { Trash2, ArrowRight, Edit2, FolderKanban } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectCard({ project, onDelete, onEdit }) {
  return (
    <Card
      key={project.id}
      className="group shadow-md hover:shadow-lg transition-shadow"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
            <FolderKanban className="h-5 w-5 text-primary" />
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full capitalize bg-green-100 text-green-700`}
          >
            Active
          </span>
        </div>
        <CardTitle
          className={
            "xl:text-2xl lg:text-lg text-sm font-semibold mt-2 text-neutral-800"
          }
        >
          {project.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs lg:text-sm xl:text-lg">
          {project.description || "No description"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(project)}
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(project.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button asChild size="sm">
              <Link href={`/projects/${project.id}`}>
                View
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
