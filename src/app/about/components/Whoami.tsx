import {Terminal} from "lucide-react";
import H2 from "@/components/H2";
import {cn} from "@/lib/utils";

interface whoamiProps {
  description: string[];
}

export default function Whoami({ description }: whoamiProps) {
  return (
    <div
      className={cn(
        "group space-y-4 rounded-lg border-l-8 border-r-8 border-primary bg-card p-6 shadow-sm transition-all"
      )}
    >
      <div className="flex items-center gap-3">
        <Terminal className="h-6 w-6 text-primary"/>
        <H2 className="text-2xl">whoami</H2>
      </div>
      <div className="space-y-4 pl-2">
        {description.map((desc, index) => (
          <p key={index} className="text-muted-foreground">
            {desc}
          </p>
        ))}
      </div>
    </div>
  );
}
