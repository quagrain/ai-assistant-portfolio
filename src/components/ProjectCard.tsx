interface Project {
  title: string;
  description: string;
  tech: string;
}

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
      <p className="mb-4 text-muted-foreground">{project.description}</p>
      <p className="text-sm font-medium text-primary">{project.tech}</p>
    </div>
  );
}
