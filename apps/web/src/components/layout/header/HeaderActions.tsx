"use client";

import { IconSparkles } from "@tabler/icons-react";

import { useConcierge } from "@/components/concierge/ConciergeProvider";

type HeaderActionsProps = {
  scrolled: boolean;
};

export default function HeaderActions({
  scrolled,
}: HeaderActionsProps) {
  const { openConcierge } = useConcierge();

  return (
    <div
      className="
        hidden
        items-center
        lg:flex
      "
    >
      <button
        type="button"
        onClick={() =>
          openConcierge(
            "Aiutami a organizzare il mio viaggio in Sicilia"
          )
        }
        className={`
          group
          inline-flex
          h-12
          items-center
          gap-2.5
          rounded-full
          bg-[#F58220]
          px-6
          text-[13px]
          font-semibold
          text-white
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#E87415]
          xl:px-7

          ${
            scrolled
              ? `
                shadow-[0_10px_28px_rgba(245,130,32,0.22)]
              `
              : `
                border
                border-white/20
                shadow-[0_10px_30px_rgba(0,0,0,0.20)]
              `
          }
        `}
      >
        <IconSparkles
          size={17}
          stroke={1.7}
          className="
            transition-transform
            duration-300
            group-hover:rotate-12
          "
        />

        <span>Organizza il viaggio</span>
      </button>
    </div>
  );
}