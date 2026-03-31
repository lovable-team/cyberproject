import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function AnalysisLoader() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      { width: "90%", duration: 3, ease: "power2.inOut" }
    );
  }, []);

  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center glass rounded-2xl p-10"
      >
        <div className="relative w-16 h-16 mx-auto mb-6">
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
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div ref={barRef} className="h-full bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
