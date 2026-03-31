import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "./ui/card";
import { ShieldCheck, Lock, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: ShieldCheck, value: 97.8, suffix: "%", label: "Detection Accuracy" },
  { icon: Lock, value: 0, suffix: "", label: "Data Stored", display: "Zero" },
  { icon: Zap, value: 2.3, suffix: "s", label: "Average Analysis Time" },
];

export default function TrustSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const nums = containerRef.current.querySelectorAll(".trust-num");
    nums.forEach((el, i) => {
      const stat = stats[i];
      if (stat.display) {
        (el as HTMLElement).textContent = stat.display;
        return;
      }
      gsap.fromTo(
        { val: 0 },
        { val: stat.value },
        {
          val: stat.value,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: function () {
            (el as HTMLElement).textContent =
              (this as any).targets()[0].val.toFixed(stat.suffix === "%" ? 1 : 1) + stat.suffix;
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Built on Trust</h2>
        <p className="text-muted-foreground mb-14 max-w-lg mx-auto">
          Your content is analyzed in real-time and never stored. Privacy is not a feature — it's a guarantee.
        </p>

        <div ref={containerRef} className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="glass rounded-2xl p-6 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="trust-num font-display text-3xl font-bold text-foreground">0</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
