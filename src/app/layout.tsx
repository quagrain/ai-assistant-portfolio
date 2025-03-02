import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProviders from "@/components/CustomThemeProvider";

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
    <html lang="en">
      <body>
        <ThemeProviders>
          <Navbar />
          <main className="mx-auto max-w-3xl px-3 py-10">{children}</main>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  );
}
