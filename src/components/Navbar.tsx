import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger);

const links = ["Home", "Upload", "How it Works"];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    ScrollTrigger.create({
      start: "top -80",
      onUpdate: (self) => {
        if (!navRef.current) return;
        if (self.direction === 1) {
          gsap.to(navRef.current, { height: 56, duration: 0.3 });
        } else {
          gsap.to(navRef.current, { height: 72, duration: 0.3 });
        }
      },
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(/ /g, "-"));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-6 md:px-12 glass-strong"
    >
      <div className="flex items-center gap-2">
        <Shield className="w-7 h-7 text-primary" />
        <span className="font-display font-bold text-lg text-foreground">TruthLens</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <motion.button
            key={link}
            onClick={() => scrollTo(link)}
            className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            whileHover="hover"
          >
            {link}
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
              initial={{ width: 0 }}
              variants={{ hover: { width: "100%" } }}
              transition={{ duration: 0.25 }}
            />
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button
          size="sm"
          className="glow-primary-sm"
          onClick={() => scrollTo("Upload")}
        >
          Analyze Now
        </Button>
      </div>
    </nav>
  );
}
