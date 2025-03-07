"use client"

import H3 from "@/components/H3";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter} from "@/components/ui/card";

import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {ChevronDown, ChevronUp, ExternalLink, Github} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";

export interface ProjectCardProps {
  title: string;
  featured: boolean;
  techStack: string[];
  description: string;
  longDescription: string;
  liveUrl: string | undefined;
  githubUrl: string | undefined;
  image: { src: string, alt: string };
}

export default function FeaturedCard({project}: { project: ProjectCardProps }) {
  const {title, image, liveUrl, githubUrl, description, longDescription, techStack, featured} = project;
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Card>
        <CardContent className="flex flex-col md:flex-row gap-8 rounded-lg bg-card">
          <div className="md:w-2/5">
            <div className="aspect-video relative rounded-md overflow-hidden border">
              <Image src={image.src} alt={image.alt} fill className="object-cover"/>
            </div>
          </div>
          <div className="md:w-3/5 space-y-4">
            <H3>{title}</H3>
            <div>
              {isExpanded ? (
                <CardDescription className="text-muted-foreground">
                  {longDescription}
                </CardDescription>
              ) : (
                <CardDescription className="text-muted-foreground line-clamp-3">
                  {description}
                </CardDescription>
              )}

              {longDescription && (
                <Button
                  variant="link"
                  className="p-0 h-auto mt-1 text-primary"
                  onClick={toggleDescription}
                >
                  {isExpanded ? (
                    <span className="flex items-center">
                      Read less <ChevronUp size={16} className="ml-1"/>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Read more <ChevronDown size={16} className="ml-1"/>
                    </span>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start py-[16px]">
          <div className="flex gap-4 mb-4">
            {githubUrl && (
              <Link href={githubUrl} target="_blank"
                    className="flex items-center gap-2 text-sm text-primary hover:underline">
                <Github size={16}/>View Code
              </Link>
            )}
            {liveUrl && (
              <Link href={liveUrl} target="_blank"
                    className="flex items-center gap-2 text-sm text-primary hover:underline">
                <ExternalLink size={16}/>Live Demo
              </Link>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {isMobile ? (
              <>
                {techStack.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="chip" className="rounded-full">{tech}</Badge>
                ))}
                {techStack.length > 3 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Badge variant="chip" className="ml-1.5">
                        +{techStack.slice(3).length}
                      </Badge>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-2 flex flex-wrap gap-2 outline-none">
                      {techStack.slice(3).map((tech, index) => (
                        <Badge key={index} variant="chip">{tech}</Badge>
                      ))}
                    </PopoverContent>
                  </Popover>
                )}
              </>
            ) : (
              techStack.map((tech, index) => (
                <Badge key={index} variant="chip" className="rounded-full">{tech}</Badge>
              ))
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}