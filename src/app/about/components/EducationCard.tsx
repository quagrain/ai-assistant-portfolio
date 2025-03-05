import H3 from "@/components/H3";

export interface EducationProps {
  major: string;
  period: string;
  school: string;
  description: string;
}

export default function Education({
  major,
  period,
  school,
  description,
}: EducationProps) {
  return (
    <>
      <div className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-md">
        <div className="flex flex-col justify-between gap-2 border-b border-border pb-4 sm:flex-row sm:items-center">
          <H3 className="group-hover:text-primary">{school}</H3>
          <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
            {period}
          </span>
        </div>
        <div className="pt-4">
          <p className="font-medium">{major}</p>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
      </div>
    </>
  );
}
