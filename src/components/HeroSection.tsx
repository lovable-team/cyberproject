import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll(".hero-anim");
    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div ref={containerRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          AI-Powered Authenticity Detection
        </div>
        <h1 className="hero-anim font-display text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          Is it <span className="text-gradient">AI</span> or{" "}
          <span className="text-gradient">Real</span>?
        </h1>
        <p className="hero-anim mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Upload any content — text, image, audio, or video — and our advanced AI will determine its authenticity in seconds.
        </p>
        <div className="hero-anim mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-base glow-primary"
            onClick={() =>
              document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Analyze Content
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base glass"
            onClick={() =>
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Learn How
          </Button>
        </div>
        <motion.div
          className="mt-16"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 mx-auto text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  );
}
