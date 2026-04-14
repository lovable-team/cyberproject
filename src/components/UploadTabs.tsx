import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FileText, Image, Mic, Video, Upload, Loader2, CheckCircle } from "lucide-react";
import gsap from "gsap";

const tabConfig = [
  { value: "text", label: "Text", icon: FileText, formats: "Paste or type any text", colorVar: "--content-text" },
  { value: "image", label: "Image", icon: Image, formats: "JPG, PNG, WebP — up to 10MB", colorVar: "--content-image" },
  { value: "audio", label: "Audio", icon: Mic, formats: "MP3, WAV, M4A — up to 25MB", colorVar: "--content-audio" },
  { value: "video", label: "Video", icon: Video, formats: "MP4, MOV, WebM — up to 50MB", colorVar: "--content-video" },
];

interface Props {
  onAnalyze: (type: string, content: string | File) => void;
  loading: boolean;
}

export default function UploadTabs({ onAnalyze, loading }: Props) {
  const [tab, setTab] = useState("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRendered = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || cardsRendered.current) return;
    cardsRendered.current = true;
    const els = sectionRef.current.querySelectorAll(".upload-stagger");
    gsap.fromTo(
      els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    if (!boxRef.current || tab === "text") return;
    const currentColor = tabConfig.find(t => t.value === tab)?.colorVar;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(boxRef.current, {
      boxShadow: `0 0 30px -10px hsl(var(${currentColor}) / 0.25)`,
      duration: 2,
      ease: "sine.inOut",
    });
    return () => { tl.kill(); };
  }, [tab]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) setFile(f);
    },
    []
  );

  const handleSubmit = () => {
    if (tab === "text" && text.trim()) onAnalyze("text", text);
    else if (file) onAnalyze(tab, file);
  };

  const activeColor = tabConfig.find(t => t.value === tab)?.colorVar || "--content-text";

  return (
    <section id="upload" className="py-24 px-6" ref={sectionRef}>
      <div className="max-w-2xl mx-auto text-center mb-10 upload-stagger">
        <h2 className="font-display text-3xl md:text-4xl font-bold">Upload Your Content</h2>
        <p className="mt-3 text-muted-foreground">Select the content type and upload or paste to begin analysis.</p>
      </div>

      <Card className="max-w-2xl mx-auto glass rounded-2xl p-6 upload-stagger">
        <Tabs value={tab} onValueChange={(v) => { setTab(v); setFile(null); setText(""); }}>
          <TabsList className="w-full grid grid-cols-4 bg-secondary/10 rounded-xl">
            {tabConfig.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
              >
                <t.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="mt-6"
            >
              {tab === "text" ? (
                <Textarea
                  placeholder="Paste or type the text you want to analyze…"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[160px] bg-secondary/30 border-border/50 rounded-xl resize-none"
                />
              ) : (
                <motion.div
                  ref={boxRef}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  animate={dragOver ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative flex flex-col items-center justify-center gap-3 min-h-[160px] rounded-xl border-2 border-dashed transition-colors duration-300 ${
                    dragOver ? "border-primary bg-primary/5" : "border-border/50 bg-secondary/20"
                  }`}
                >
                  <motion.div
                    animate={dragOver ? { y: -4, scale: 1.1 } : { y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </motion.div>
                  {file ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" style={{ color: `hsl(var(${activeColor}))` }} />
                      <p className="text-sm font-medium text-foreground">{file.name}</p>
                    </motion.div>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Drag & drop or{" "}
                        <label className="text-primary cursor-pointer hover:underline">
                          browse
                          <input
                            type="file"
                            className="hidden"
                            accept={
                              tab === "image" ? "image/*" :
                              tab === "audio" ? "audio/*" :
                              "video/*"
                            }
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                          />
                        </label>
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        {tabConfig.find((t) => t.value === tab)?.formats}
                      </p>
                    </>
                  )}
                </motion.div>
              )}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-5">
                <Button
                  className="w-full glow-primary-sm"
                  size="lg"
                  disabled={loading || (tab === "text" ? !text.trim() : !file)}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing…
                    </>
                  ) : (
                    "Analyze Content"
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </Card>
    </section>
  );
}
