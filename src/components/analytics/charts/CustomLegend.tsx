
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomLegendProps {
  payload: any[];
  visibleLines: Record<string, boolean>;
  toggleLine: (lineKey: string) => void;
}

export function CustomLegend({ payload, visibleLines, toggleLine }: CustomLegendProps) {
  return (
    <div className="flex flex-wrap gap-6 justify-center mt-4">
      {payload.map((entry: any, index: number) => (
        <div
          key={`item-${index}`}
          className="flex items-center gap-2"
        >
          <Checkbox
            id={entry.dataKey}
            checked={visibleLines[entry.dataKey as keyof typeof visibleLines]}
            onCheckedChange={() => toggleLine(entry.dataKey)}
          />
          <label 
            htmlFor={entry.dataKey}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.value}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
