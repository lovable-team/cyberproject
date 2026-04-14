import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FileText, Mic, Video, Image } from "lucide-react";

const floatingIcons = [
  { icon: FileText, colorVar: "--content-text", x: -80, y: -40 },
  { icon: Mic, colorVar: "--content-audio", x: 80, y: -30 },
  { icon: Video, colorVar: "--content-video", x: -60, y: 50 },
  { icon: Image, colorVar: "--content-image", x: 70, y: 60 },
];

export default function AnalysisLoader() {
  const barRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      { width: "90%", duration: 3, ease: "power2.inOut" }
    );

    iconsRef.current.forEach((el, i) => {
      if (!el) return;
      const cfg = floatingIcons[i];
      gsap.set(el, { x: cfg.x * 2, y: cfg.y * 2, opacity: 0, scale: 0.5 });
      gsap.to(el, {
        x: 0,
        y: 0,
        opacity: 0.6,
        scale: 0.8,
        duration: 2,
        delay: i * 0.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center glass rounded-2xl p-10 relative overflow-hidden"
      >
        <div className="relative w-16 h-16 mx-auto mb-6">
          {floatingIcons.map((item, i) => (
            <div
              key={i}
              ref={(el) => { iconsRef.current[i] = el; }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <item.icon className="w-4 h-4" style={{ color: `hsl(var(${item.colorVar}))` }} />
            </div>
          ))}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-1 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
        <h3 className="font-display text-xl font-semibold mb-2">Analyzing content…</h3>
        <p className="text-sm text-muted-foreground mb-6">Our AI is examining patterns and artifacts.</p>
        <div className="h-1.5 bg-secondary/20 rounded-full overflow-hidden">
          <div ref={barRef} className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
