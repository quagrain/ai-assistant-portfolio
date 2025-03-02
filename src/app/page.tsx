import { H1 } from "@/components/ui/H1";
import { Metadata } from "next";
import Image from "next/image";
import flash from "@/assets/flash.png";
import { H2 } from "@/components/ui/H2";

import { Bot } from "lucide-react";
export const metadata: Metadata = {
  title: "Smart Portfolio",
};

export default function Home() {
  return (
    <section className="space-y-16 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat px-1 py-8">
      <section className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
        <div className="spcae-y-1">
          <H1 className="text-center sm:text-start">Hi, I&apos;m Person</H1>
          <p className="text-center sm:text-start">I&apos;m something!</p>
        </div>

        <div className="flex justify-center">
          <Image
            src={flash}
            alt="Flash Funk album art"
            height={300}
            width={300}
            className="dark:border-foreground aspect-square rounded-full border-2 object-cover shadow-md"
          />
        </div>
      </section>
      <section className="space-y-3 text-center">
        <H2>Ask the chatbot anything about me.</H2>
        <p>
          Click the little <Bot className="inline pb-1" /> at the top to
          activate it. The bot will find any relevant info about me on this
          website. It can provide links to pages as well.
        </p>
      </section>
    </section>
  );
}
