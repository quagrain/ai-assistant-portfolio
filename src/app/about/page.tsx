import ExperienceCard, { ExperienceProps } from "./components/ExperienceCard";
import Education, { EducationProps } from "./components/EducationCard";
import SkillCard, { SkillCardProps } from "./components/SkillCard";
import BottomCard from "./components/BottomCard";
import Whoami from "./components/Whoami";
import me from "@/assets/profile.png";
import Hero from "./components/Hero";
import H2 from "@/components/H2";

import { Metadata } from "next";
import {
  Code,
  Cpu,
  Briefcase,
  GitBranch,
  Smartphone,
  GanttChart,
  GraduationCap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Victor | Portfolio",
};

/* Change to match personal details */
const heroBadgeItems: string[] = ["React", "TypeScript", "Node.js", "UI/UX"];

const whoamiDescription: string[] = [
  `I'm Victor Quagraine, a final year Computer Science student at Ashesi University with a focus 
  on full-stack development and user experience design. My journey in tech started with a fascination 
  for solving real-world problems through elegant code and intuitive interfaces.`,
  `When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, 
  or mentoring junior developers. I believe in technology's power to create meaningful change when built with empathy and purpose.`,
];

const educationDetails: EducationProps[] = [
  {
    major: "Computer Science",
    period: "2022 - 2025",
    school: "Ashesi University",
    description: `Obtained a scholarship to study at Ashesi University as a Computer Science Student. Relevant 
                  course work includes Linear Algebra, Data Structures, Algorithms, Web Development, and Software Engineering.`,
  },
  {
    major: "Computer Science",
    period: "2022 - 2025",
    school: "Ashesi University",
    description: `Obtained a scholarship to study at Ashesi University as a Computer Science Student. Relevant 
                  course work includes Linear Algebra, Data Structures, Algorithms, Web Development, and Software Engineering.`,
  },
];

const proExperiences: ExperienceProps[] = [
  {
    role: "Software Engineering Intern",
    period: "May 2021 - August 2021",
    company: "MTN Ghana",
    description: `Worked on the MoMo app team to improve the application's performance and user experience. 
                  Developed new features for the app and contributed to the smooth scaling of the system.`,
  },
  {
    role: "Frontend Developer",
    period: "January 2021 - May 2021",
    company: "Yango",
    description: `Built and maintained user interfaces. Collaborated with designers and product managers to create accessible and performant applications.`,
  },
];

const technicalSkills: SkillCardProps[] = [
  {
    Icon: Code,
    color: "primary",
    skill: "Frontend",
    description: "React, Vue, TypeScript",
  },
  {
    Icon: GanttChart,
    color: "secondary",
    skill: "Backend",
    description: "Node.js, Express, MongoDB",
  },
  {
    Icon: GitBranch,
    color: "destructive",
    skill: "DevOps",
    description: "Docker, Kubernetes, CI/CD",
  },
  {
    Icon: Smartphone,
    color: "accent",
    skill: "Mobile",
    description: "React Native, Flutter, Swift",
  },
];

export default function Page() {
  return (
    <section className="container mx-auto max-w-4xl space-y-12 py-8">
      <Hero
        title="About Me"
        img={me}
        imgAlt="Victor Quagraine"
        badgeItems={heroBadgeItems}
        description="Full-Stack Developer with a passion for creating impactful solutions"
      />

      <div className="space-y-12">
        <Whoami description={whoamiDescription} />

        {/* Education Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            <H2 className="text-2xl">Education</H2>
          </div>
          {educationDetails.map((education, index) => (
            <Education key={index} {...education} />
          ))}
        </div>

        {/* Experience Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-primary" />
            <H2 className="text-2xl">Professional Experience</H2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {proExperiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} />
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Cpu className="h-6 w-6 text-primary" />
            <H2 className="text-2xl">Technical Skills</H2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {technicalSkills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </div>

        {/* Projects/ Contact Section */}
        <BottomCard
          left_button="View Projects"
          right_button="Get in Touch"
          header="Interested in working with me?"
          details="I am always open to new opportunities and collaborations. Feel free to reach out to me for any inquiries or just to say hi!"
        />
      </div>
    </section>
  );
}
