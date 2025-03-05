import H3 from "@/components/H3";

export interface ExperienceProps {
  role: string;
  period: string;
  company: string;
  description: string;
}

export default function ExperienceCard({
  role,
  period,
  company,
  description,
}: ExperienceProps) {
  const baseId = `${company.toLowerCase().replace(/\s+/g, '-')}-${role.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div id={`experience-card-${baseId}`} className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md">
      <div id={`experience-header-${baseId}`} className="flex flex-col justify-between gap-2 border-b border-border pb-4">
        <H3 className="group-hover:text-primary">{role}</H3>
        <span id={`experience-period-${baseId}`} className="inline-flex w-fit items-center rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
          {period}
        </span>
      </div>
      <div id={`experience-content-${baseId}`} className="pt-4">
        <p id={`experience-company-${baseId}`} className="font-medium">{company}</p>
        <p id={`experience-description-${baseId}`} className="mt-2 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
