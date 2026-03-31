import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Lightbulb } from "lucide-react";

interface Props {
  insights: string[];
}

export default function ExplanationPanel({ insights }: Props) {
  return (
    <Card className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-primary" />
        <h3 className="font-display text-lg font-semibold">Analysis Breakdown</h3>
      </div>
      <ul className="space-y-3">
        {insights.map((insight, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-start gap-3 text-sm text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
            {insight}
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}
