import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Upload, Cpu, FileCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Upload, title: "Upload Content", desc: "Drop any text, image, audio, or video file into our secure analyzer." },
  { icon: Cpu, title: "AI Analysis", desc: "Our multi-model engine scans for patterns, artifacts, and inconsistencies." },
  { icon: FileCheck, title: "Get Report", desc: "Receive a detailed breakdown with confidence scores and explanations." },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".step-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    });
  }, []);

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-center text-muted-foreground mb-14">Three simple steps to verify content authenticity.</p>

        <div ref={containerRef} className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div key={i} whileHover={{ y: -4 }} className="step-card">
              <Card className="glass rounded-2xl p-6 text-center h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center"
                >
                  <step.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <div className="text-xs font-medium text-muted-foreground mb-2">Step {i + 1}</div>
                <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
