import Image, { StaticImageData } from "next/image";
import { Badge } from "@/components/ui/badge";
import H1 from "@/components/H1";

interface HeroProps {
  title: string;
  imgAlt: string;
  description: string;
  badgeItems: string[];
  img: StaticImageData;
}

export default function Hero({
  title,
  imgAlt,
  img,
  description,
  badgeItems,
}: HeroProps) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-xl p-8 shadow-lg bg-gradient-to-br from-primary/40 to-secondary/40">
      <div className="absolute -right-20 -top-20 h-60 w-80 rounded-full bg-accent/2- blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 h-68 w-80 rounded-full bg-primary/20 blur-3xl"></div>
      <div className="relative flex flex-col items-center gap-6 md:flex-row">
        <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-primary/30 shadow-xl">
          <Image
            src={img}
            alt={imgAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-4 text-center md:text-left">
          <H1>{title}</H1>
          <p className="max-w-2xl text-lg font-light italic text-muted-foreground">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {badgeItems.map((item, index) => (
              <Badge key={index}>{item}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
