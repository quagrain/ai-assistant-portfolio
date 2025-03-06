import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import ThemeProviders from "@/contexts/CustomThemeProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | Smart Portfolio",
    default: "Smart Portfolio",
  },
  description: "A portfolio using a chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProviders>
          <Navbar />
          <main className="mx-auto max-w-4xl px-3 py-10">{children}</main>
        </ThemeProviders>
      </body>
    </html>
  );
}
