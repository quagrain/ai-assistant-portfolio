import { Code } from "lucide-react";
import { cn } from "@/lib/utils";

import React from "react";

export type ThemeColor =
  | "secondary"
  | "primary"
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

  const colorClasses = {
    icon: {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      destructive: "text-destructive",
      muted: "text-muted",
    },
    background: {
      primary: "bg-primary/10",
      secondary: "bg-secondary/10",
      accent: "bg-accent/10",
      destructive: "bg-destructive/10",
      muted: "bg-muted/10",
    },
    hover: {
      primary: "hover:border-primary",
      secondary: "hover:border-secondary",
      accent: "hover:border-accent",
      destructive: "hover:border-destructive",
      muted: "hover:border-muted",
    },
  };

  const IconComponent = Icon || Code;

  return (
    <div
      className={cn(
        "group flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md",
        colorClasses.hover[color]
      )}
    >
      <div className={cn("mb-2 rounded-full p-3", colorClasses.background[color])}>
        <IconComponent className={cn("h-6 w-6", colorClasses.icon[color])} />
      </div>
      <h3 className="font-semibold">{skill}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}