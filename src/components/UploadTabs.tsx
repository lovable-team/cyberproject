import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { FileText, Image, Mic, Video, Upload, Loader2 } from "lucide-react";
import gsap from "gsap";

const tabConfig = [
  { value: "text", label: "Text", icon: FileText, formats: "Paste or type any text" },
  { value: "image", label: "Image", icon: Image, formats: "JPG, PNG, WebP — up to 10MB" },
  { value: "audio", label: "Audio", icon: Mic, formats: "MP3, WAV, M4A — up to 25MB" },
  { value: "video", label: "Video", icon: Video, formats: "MP4, MOV, WebM — up to 50MB" },
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

  useEffect(() => {
    if (!boxRef.current) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(boxRef.current, { boxShadow: "0 0 30px -10px hsl(220 90% 56% / 0.25)", duration: 2, ease: "sine.inOut" });
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

  return (
    <section id="upload" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold">Upload Your Content</h2>
        <p className="mt-3 text-muted-foreground">Select the content type and upload or paste to begin analysis.</p>
      </div>

      <Card className="max-w-2xl mx-auto glass rounded-2xl p-6">
        <Tabs value={tab} onValueChange={(v) => { setTab(v); setFile(null); setText(""); }}>
          <TabsList className="w-full grid grid-cols-4 bg-secondary/50 rounded-xl">
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
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
                <div
                  ref={boxRef}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`relative flex flex-col items-center justify-center gap-3 min-h-[160px] rounded-xl border-2 border-dashed transition-all duration-300 ${
                    dragOver ? "border-primary scale-[1.02] bg-primary/5" : "border-border/50 bg-secondary/20"
                  }`}
                >
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  {file ? (
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Drag & drop or{" "}
                        <label className="text-primary cursor-pointer hover:underline">
                          browse
                          <input
                            type="file"
                            className="hidden"
                            accept={tab === "image" ? "image/*" : tab === "audio" ? "audio/*" : "video/*"}
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                          />
                        </label>
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        {tabConfig.find((t) => t.value === tab)?.formats}
                      </p>
                    </>
                  )}
                </div>
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
