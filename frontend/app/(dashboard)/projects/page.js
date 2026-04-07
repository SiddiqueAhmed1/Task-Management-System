import ProjectList from "@/components/projects/ProjectList";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1
          className={
            "text-2xl lg:text-4xl xl:text-5xl font-semibold text-neutral-800"
          }
        >
          Projects
        </h1>
        <p className="text-muted-foreground  lg:text-xl text-sm">
          Manage all your projects here.
        </p>
      </div>
      <ProjectList />
    </div>
  );
}
