import H1 from "@/components/H1";
import H2 from "@/components/H2";
import BottomCard from "@/app/about/components/BottomCard";
import FeaturedCard, {ProjectCardProps} from "./components/FeaturedCard";
import OtherCard from "@/app/projects/components/OtherCard";

import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Projects | Victor's Portfolio",
};

const projects: ProjectCardProps[] = [
  {
    featured: true,
    title: "Project Alpha",
    liveUrl: "https://github.com/quagrain",
    githubUrl: "https://github.com/quagrain",
    image: {src: "/projects/project-alpha.jpeg", alt: "image"},
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
    description: "A full-stack web application with real-time features",
    longDescription:
      "Project Alpha is a comprehensive collaboration platform designed for remote teams.",
  },
  {
    featured: true,
    title: "Smart Portfolio",
    liveUrl: "https://github.com/quagrain",
    githubUrl: "https://github.com/quagrain",
    image: {src: "/projects/portfolio.png", alt: "image"},
    description: "Personal portfolio website with AI chatbot integration",
    techStack: ["Next.js", "React", "TailwindCSS", "AI SDK", "TypeScript"],
    longDescription:
      "This portfolio website showcases my projects and skills while incorporating an AI chatbot that can answer " +
      "questions about my experience and background. The site uses Next.js for server-side rendering and is styled with " +
      "TailwindCSS. The chatbot is powered by a custom AI solution that can retrieve information from across the site.",
  },
  {
    featured: false,
    liveUrl: "https://github.com/quagrain",
    githubUrl: "https://github.com/quagrain",
    title: "Ashesi Course Management System",
    image: {src: "/projects/cms.jpeg", alt: "image"},
    techStack: ["Vue.js", "Firebase", "Cloud Functions", "Tailwind CSS"],
    description: "A web application for managing university courses and resources",
    longDescription:
      "Developed a comprehensive course management system for Ashesi University that allows professors to upload materials, " +
      "create assignments, and grade students' work. Students can access course materials, submit assignments, and track " +
      "their progress. The system has streamlined the academic workflow for over 1,000 students.",
  },
  {
    featured: true,
    liveUrl: "https://github.com/quagrain",
    githubUrl: "https://github.com/quagrain",
    title: "Ashesi Course Management System",
    image: {src: "/projects/cms.jpeg", alt: "image"},
    techStack: ["Vue.js", "Firebase", "Cloud Functions", "Tailwind CSS"],
    description: "A web application for managing university courses and resources",
    longDescription:
      "Developed a comprehensive course management system for Ashesi University that allows professors to upload materials, " +
      "create assignments, and grade students' work. Students can access course materials, submit assignments, and track " +
      "their progress. The system has streamlined the academic workflow for over 1,000 students."
  },
];

const featuredProjects = projects.filter((project) => project.featured);
const otherProjects = projects.filter((project) => !project.featured);

export default function ProjectsPage() {
  return (
    <section className="space-y-12">
      <div className="mb-8 text-center">
        <H1>My Projects</H1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          A collection of my work spanning web development, mobile applications,
          and UI/UX design. Each project represents challenges I have tackled
          and skills I have developed.
        </p>
      </div>

      <div className="space-y-8">
        <H2>Featured Projects</H2>
        <div className="grid grid-cols-1 gap-12">
          {featuredProjects.map((project, index) => (
            <FeaturedCard key={index} project={project}/>
          ))}
        </div>
      </div>

      {/* Other Projects */}
      <div className="space-y-8">
        <H2>Other Projects</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((project, index) => (
            <OtherCard key={index} project={project}/>
          ))}
        </div>
      </div>

      <BottomCard
        header="Do these projects interest you?"
        details={
          "You can reach out to me on my social media. You can also learn more about me on the About page"
        }
        left_button={{href: "/social", label: "Contact Me"}}
        right_button={{href: "/about", label: "Learn More"}}
      />
    </section>
  );
}
