import me from "@/assets/profile.png";
import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Bot } from "lucide-react";
import SkillCard from "@/components/ui/SkillCard";

export const metadata: Metadata = {
  title: "Smart Portfolio",
};

const skills = [
  "Frontend Development",
  "Backend Engineering",
  "UI/UX Design",
  "Database Management",
  "Mobile Development",
  "Machine Learning",
];

const projects = [
  {
    title: "Project Alpha",
    description: "A full-stack web application with real-time features",
    tech: "React, Node.js, MongoDB",
  },
  {
    title: "UI Design System",
    description: "A comprehensive design system for modern web applications",
    tech: "Figma, Storybook, TailwindCSS",
  },
];

export default function Home() {
  return (
    <section className="space-y-16 bg-cover bg-center bg-no-repeat px-1 py-8">
      <section className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <H1 className="text-center sm:text-start">
            Hi, I&apos;m Victor Quagraine
          </H1>
          <p className="text-center text-lg text-muted-foreground sm:text-start">
            Full-Stack Developer & Final Year Student at Ashesi University
          </p>
          <div className="flex justify-center sm:justify-start gap-3 pt-2">
            <Link href="/about">
              <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
                About Me
              </button>
            </Link>
            <Link href="/social">
              <button className="rounded-md border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                Connect
              </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={me}
            alt="An AI generated image of a chef in a kitchen typing on his computer with some utensils in the background"
            height={300}
            width={300}
            className="dark:border-foreground aspect-square rounded-full border-2 object-cover shadow-md"
          />
        </div>
      </section>

      <section className="space-y-3 text-center">
        <H2>Ask the chatbot anything about me</H2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Click the <Bot className="inline pb-1" /> icon in the navigation bar
          to chat with my AI persona. It can answer questions about my
          experience, projects, and skills by finding relevant information
          across this website.
        </p>
      </section>

      <section className="space-y-6">
        <H2 className="text-center">Skills & Expertise</H2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill} skill={skill} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <H2 className="text-center">Featured Projects</H2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
              <p className="mb-4 text-muted-foreground">
                {project.description}
              </p>
              <p className="text-sm font-medium text-primary">{project.tech}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/projects">
            <button className="rounded-md border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground">
              View All Projects
            </button>
          </Link>
        </div>
      </section>
    </section>
  );
}
