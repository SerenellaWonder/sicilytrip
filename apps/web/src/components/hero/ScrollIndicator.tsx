"use client";

import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <div
      className="
        absolute
        bottom-20
        left-1/2
        z-20
        hidden
        -translate-x-1/2
        sm:block
      "
    >
      <button
        type="button"
        aria-label="Scorri verso il basso"
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-white/30
          bg-white/10
          text-white
          backdrop-blur-md
          transition
          duration-300
          hover:bg-white/20
        "
      >
        <ChevronDown
          size={18}
          className="animate-bounce"
        />
      </button>
    </div>
  );
}