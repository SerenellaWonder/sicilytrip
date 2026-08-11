"use client";

import {
  Calendar,
  MapPin,
  Search,
  Users,
} from "lucide-react";

export default function SearchBox() {
  return (
    <div
      className="
        rounded-2xl
        bg-white
        p-3
        shadow-[0_20px_50px_rgba(0,0,0,.12)]
      "
    >
      <div
        className="
          grid
          grid-cols-[2fr_1fr_1fr_1fr_150px]
          items-center
        "
      >
        <Field
          icon={<MapPin size={18} />}
          label="Dove vuoi andare?"
        />

        <Field
          icon={<Calendar size={18} />}
          label="Check-in"
        />

        <Field
          icon={<Calendar size={18} />}
          label="Check-out"
        />

        <Field
          icon={<Users size={18} />}
          label="Ospiti"
        />

        <button
          className="
            flex
            h-[56px]
            items-center
            justify-center
            rounded-xl
            bg-[#F58220]
            font-semibold
            text-white
          "
        >
          Cerca
        </button>

      </div>
    </div>
  );
}

function Field({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="
        flex
        h-[56px]
        items-center
        gap-3
        border-r
        border-slate-200
        px-5
      "
    >
      <div className="text-slate-500">
        {icon}
      </div>

      <input
        placeholder={label}
        className="
          w-full
          bg-transparent
          text-[15px]
          outline-none
          placeholder:text-slate-500
        "
      />
    </div>
  );
}