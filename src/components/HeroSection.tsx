import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Button } from "./ui/button";
import { ArrowDown, FileText, Mic, Video, Image, TrendingUp } from "lucide-react";

const contentElements = [
  { icon: FileText, label: "Text", color: "var(--content-text)", angle: 0, delay: 0 },
  { icon: Mic, label: "Audio", color: "var(--content-audio)", angle: 72, delay: 0.12 },
  { icon: Video, label: "Video", color: "var(--content-video)", angle: 144, delay: 0.24 },
  { icon: Image, label: "Image", color: "var(--content-image)", angle: 216, delay: 0.36 },
  { icon: TrendingUp, label: "Graph", color: "var(--content-graph)", angle: 288, delay: 0.48 },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Staggered text entrance
    const els = containerRef.current.querySelectorAll(".hero-anim");
    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
    );

    // Orb pulse
    if (orbRef.current) {
      gsap.to(orbRef.current, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Animate orbiting elements: fly in then orbit
    elementsRef.current.forEach((el, i) => {
      if (!el) return;
      const cfg = contentElements[i];
      const rad = (cfg.angle * Math.PI) / 180;
      const orbitRadius = 140;
      const targetX = Math.cos(rad) * orbitRadius;
      const targetY = Math.sin(rad) * orbitRadius;

      // Start from far away in the element's direction
      gsap.set(el, { opacity: 0, x: targetX * 3, y: targetY * 3, scale: 0.3 });

      // Fly in
      gsap.to(el, {
        opacity: 1,
        x: targetX,
        y: targetY,
        scale: 1,
        duration: 1,
        delay: 0.5 + cfg.delay,
        ease: "power3.out",
      });

      // Continuous slow orbit after settling
      gsap.to(el, {
        rotation: 360,
        duration: 20 + i * 2,
        repeat: -1,
        ease: "none",
        delay: 1.5 + cfg.delay,
        transformOrigin: `${-targetX}px ${-targetY}px`,
      });
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div ref={containerRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Orbiting content elements + central orb */}
        <div className="relative w-72 h-72 mx-auto mb-10">
          {/* Central orb */}
          <div
            ref={orbRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary orb-glow"
          />
          {/* Orbit ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-border/20" />

          {/* Content type icons */}
          {contentElements.map((item, i) => (
            <div
              key={item.label}
              ref={(el) => { elementsRef.current[i] = el; }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-0"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-sm border border-border/30"
                style={{ backgroundColor: `hsl(${item.color} / 0.15)` }}
              >
                <item.icon className="w-5 h-5" style={{ color: `hsl(${item.color})` }} />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground mb-6">
          <span className="w-2 h-2 rounded-full bg-content-audio animate-pulse" />
          Universal Content Processing
        </div>
        <h1 className="hero-anim font-display text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          Is it <span className="text-gradient">AI</span> or{" "}
          <span className="text-gradient">Real</span>?
        </h1>
        <p className="hero-anim mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Upload any content — text, image, audio, video, or data — and our advanced AI determines its authenticity in seconds.
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
