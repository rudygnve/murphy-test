import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TipboxProps } from "@/types";

const Tipbox = ({ text, children }: TipboxProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger
          className="h-full flex items-center justify-center"
          type="button"
        >
          {children}
        </TooltipTrigger>
        <TooltipContent className="bg-primary text-white">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Tipbox;
