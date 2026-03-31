import ProjectList from "@/components/projects/ProjectList";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className={"text-3xl font-semibold text-neutral-800"}>Projects</h1>
        <p className="text-muted-foreground">Manage all your projects here.</p>
      </div>
      <ProjectList />
    </div>
  );
}
