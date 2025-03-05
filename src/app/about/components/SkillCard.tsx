import { Code } from "lucide-react";
import React from "react";

export type ThemeColor =
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "muted";

export interface SkillCardProps {
  skill: string;
  color: ThemeColor;
  description: string;
  Icon?: React.ElementType;
}

export default function SkillCard({
  Icon,
  color,
  skill,
  description,
}: SkillCardProps) {
  const styledIcon = Icon ? (
    <Icon className={`h-6 w-6 text-${color}`} />
  ) : (
    <Code className={`h-6 w-6 text-${color}`} />
  );

  return (
    <div className="group flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:border-primary hover:shadow-md">
      <div className={`mb-2 rounded-full bg-${color}/10 p-3`}>{styledIcon}</div>
      <h3 className="font-semibold">{skill}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
