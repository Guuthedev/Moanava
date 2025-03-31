"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lightbulb } from "lucide-react";

interface InfoButtonProps {
  title: string;
  content: string;
}

export function InfoButton({ title, content }: InfoButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors">
            <Lightbulb className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="text-center">
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{content}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
