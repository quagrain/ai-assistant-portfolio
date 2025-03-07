"use client"
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";

interface OtherProjectProps {
  title: string;
  description: string;
  techStack: string[];
}

export default function OtherCard({project}: { project: OtherProjectProps }) {
  const {title, description, techStack} = project;
  const [isOpen, setIsOpen] = useState(false);

  {
    return (
      <Card>
        <CardHeader className="text-xl font-bold tracking-tight">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground mt-2 flex-grow">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex space-x-3">
          {techStack.slice(0, 3).map((techStack, index) => (
            <Badge key={index} variant="chip" className="rounded-full">{techStack}</Badge>
          ))}
          <Popover open={isOpen}>
            <PopoverTrigger asChild>
              <Badge variant="chip" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}
                     className="hover:cursor-pointer">
                +{techStack.slice(3).length}
              </Badge>
            </PopoverTrigger>
            <PopoverContent onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}
                            className="pt-2 max-w-75 space-x-2 space-y-2 outline-none">
              {techStack.slice(3).map((techStack, index) => (
                <Badge key={index} variant="chip">{techStack}</Badge>
              ))}
            </PopoverContent>
          </Popover>
        </CardFooter>
      </Card>
    )
  }
}
