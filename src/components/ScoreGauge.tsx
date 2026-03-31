import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  score: number;
}

export default function ScoreGauge({ score }: Props) {
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const color =
    score < 40 ? "hsl(142, 76%, 46%)" : score < 70 ? "hsl(45, 93%, 55%)" : "hsl(0, 84%, 60%)";

  useEffect(() => {
    if (!circleRef.current || !textRef.current) return;
    const offset = circumference - (score / 100) * circumference;

    gsap.fromTo(
      circleRef.current,
      { strokeDashoffset: circumference },
      { strokeDashoffset: offset, duration: 1.5, ease: "power3.out", delay: 0.3 }
    );

    gsap.fromTo(
      textRef.current,
      { innerText: 0 },
      {
        innerText: score,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.3,
        snap: { innerText: 1 },
        onUpdate: function () {
          if (textRef.current) textRef.current.textContent = Math.round(Number(textRef.current.textContent || 0)).toString();
        },
      }
    );
  }, [score, circumference]);

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="8"
          className="stroke-secondary"
        />
        <circle
          ref={circleRef}
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          strokeWidth="8"
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span ref={textRef} className="font-display text-4xl font-bold" style={{ color }}>
          0
        </span>
        <span className="text-xs text-muted-foreground mt-1">AI Probability</span>
      </div>
    </div>
  );
}
