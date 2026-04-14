import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import UploadTabs from "@/components/UploadTabs";
import AnalysisLoader from "@/components/AnalysisLoader";
import ResultCard from "@/components/ResultCard";
import Footer from "@/components/Footer";

const mockInsights: Record<string, string[]> = {
  text: [
    "Uniform sentence structure detected — typical of language models",
    "Low lexical diversity compared to human-written content",
    "Unusual consistency in paragraph transitions",
    "No personal anecdotes or subjective expressions found",
  ],
  image: [
    "Symmetry artifacts detected in facial features",
    "Inconsistent lighting direction across the scene",
    "Texture smoothing patterns common in diffusion models",
    "Metadata lacks typical camera EXIF data",
  ],
  audio: [
    "Spectral analysis shows unnaturally smooth frequency bands",
    "Breathing patterns are absent or artificially regular",
    "Micro-pause timing is statistically uniform",
    "Background noise profile appears synthesized",
  ],
  video: [
    "Temporal inconsistencies detected between frames",
    "Facial micro-expressions lack natural variance",
    "Audio-visual lip sync shows minor desynchronization",
    "Compression artifacts inconsistent with standard encoding",
  ],
};

type Phase = "idle" | "loading" | "result";

export default function UploadPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<{ score: number; type: string; insights: string[] } | null>(null);

  const handleAnalyze = useCallback((type: string) => {
    setPhase("loading");
    setTimeout(() => {
      const score = Math.floor(Math.random() * 60) + 30;
      setResult({ score, type, insights: mockInsights[type] || mockInsights.text });
      setPhase("result");
    }, 3000);
  }, []);

  const handleReset = useCallback(() => {
    setPhase("idle");
    setResult(null);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-[72px]">
        {phase === "idle" && <UploadTabs onAnalyze={handleAnalyze} loading={false} />}
        {phase === "loading" && <AnalysisLoader />}
        {phase === "result" && result && <ResultCard result={result} onReset={handleReset} />}
      </div>
      <Footer />
    </div>
  );
}
