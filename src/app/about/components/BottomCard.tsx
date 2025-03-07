import Link from "next/link";
import {Button} from "@/components/ui/button";

import {NavLinkHref} from "@/components/navbar/Navbar";

interface BottomCardProps {
  header: string;
  details: string;
  left_button: { label: string; href: NavLinkHref };
  right_button: { label: string; href: NavLinkHref };
}

export default function BottomCard({
                                     header,
                                     details,
                                     left_button,
                                     right_button,
                                   }: BottomCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 rounded-lg bg-gradient-to-r from-primary/10 via-background to-secondary/10 p-8 text-center">
      <h3 className="text-2xl font-bold">{header}</h3>
      <p className="max-w-md text-muted-foreground">{details}</p>
      <div className="flex gap-4">
        <Link href={left_button.href}>
          <Button className="transition-colors hover:bg-primary/90">
            {left_button.label}
          </Button>
        </Link>
        <Link href={right_button.href}>
          <Button variant="secondary">{right_button.label}</Button>
        </Link>
      </div>
    </div>
  );
}
