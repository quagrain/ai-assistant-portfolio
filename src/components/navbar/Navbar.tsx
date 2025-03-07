"use client";

import ThemeToggle from "./ThemeToggle";
import AIChatButton from "./AIChatButton";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useRef, useState} from "react";

interface LinkProps {
  href: string;
  label: string;
}

const links: LinkProps[] = [
  {href: "/", label: "Home"},
  {href: "/about", label: "About Me"},
  { href: "/projects", label: "Projects" },
  { href: "/social", label: "Socials" },
];

// Update this to also match the links above. Needed for the button in the BottomCard component
export type NavLinkHref = | "/" | "/about" | "/projects" | "/social";

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);

    const currentIndex = links.findIndex((link) => link.href === pathname);

    if (currentIndex !== -1 && navRef.current) {
      const navLinks = navRef.current.querySelectorAll("a");
      const currentLink = navLinks[currentIndex];

      if (currentLink) {
        const linkRect = currentLink.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();

        setIndicatorStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        });
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      const currentIndex = links.findIndex((link) => link.href === pathname);
      if (currentIndex !== -1 && navRef.current) {
        const navLinks = navRef.current.querySelectorAll("a");
        const currentLink = navLinks[currentIndex];

        if (currentLink) {
          const linkRect = currentLink.getBoundingClientRect();
          const navRect = navRef.current.getBoundingClientRect();

          setIndicatorStyle({
            left: linkRect.left - navRect.left,
            width: linkRect.width,
          });
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);

  return (
    <header className="bg-background sticky top-0 z-10">
      <div className="mx-auto max-w-4xl px-3 py-4">
        {/* Top row with hamburger and buttons */}
        <div className="flex justify-between items-center w-full">
          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center space-y-1.5 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>

          {/* Desktop navigation */}
          <nav
            ref={navRef}
            className="hidden md:block relative space-x-4 font-medium"
          >
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`pb-1 transition-colors duration-300 ease-in-out ${
                  pathname === link.href
                    ? "text-primary"
                    : "hover:text-primary/70"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div
              className="mb-6 absolute bottom-0 h-1.5 bg-primary transition-all duration-500 ease-in-out"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
            />
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            <AIChatButton />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden w-full transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-3 pt-2">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`px-2 py-1 transition-colors duration-300 ease-in-out ${
                  pathname === link.href
                    ? "text-primary border-l-4 border-primary pl-2"
                    : "hover:text-primary/70 border-l-4 border-transparent pl-2"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}