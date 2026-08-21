"use client";

import {
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";

export default function HotelGallery({
  images,
  hotelName,
}: {
  images: string[];
  hotelName: string;
}) {
  const validImages =
    images.filter(Boolean);

  const [activeIndex, setActiveIndex] =
    useState(0);

  if (validImages.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[420px]
          items-center
          justify-center
          rounded-[30px]
          bg-gradient-to-br
          from-[#173A61]
          to-[#07182D]
          px-8
          text-center
        "
      >
        <div>
          <Images
            size={28}
            className="
              mx-auto
              text-[#F58220]
            "
          />

          <p
            className="
              mt-4
              text-lg
              font-medium
              text-white/70
            "
          >
            Immagini non disponibili
          </p>
        </div>
      </div>
    );
  }

  function previous() {
    setActiveIndex(
      current =>
        current === 0
          ? validImages.length - 1
          : current - 1
    );
  }

  function next() {
    setActiveIndex(
      current =>
        current ===
        validImages.length - 1
          ? 0
          : current + 1
    );
  }

  return (
    <div>
      <div
        className="
          relative
          overflow-hidden
          rounded-[30px]
          bg-[#0D2340]
        "
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={validImages[activeIndex]}
          alt={`${hotelName} - foto ${activeIndex + 1}`}
          className="
            h-[390px]
            w-full
            object-cover

            sm:h-[500px]
            lg:h-[600px]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#07182D]/35
            via-transparent
            to-transparent
          "
        />

        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={previous}
              aria-label="Foto precedente"
              className="
                absolute
                left-5
                top-1/2
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/90
                text-[#0D2340]
                shadow-lg
                backdrop-blur
              "
            >
              <ChevronLeft size={19} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Foto successiva"
              className="
                absolute
                right-5
                top-1/2
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-white/90
                text-[#0D2340]
                shadow-lg
                backdrop-blur
              "
            >
              <ChevronRight size={19} />
            </button>
          </>
        )}

        <div
          className="
            absolute
            bottom-5
            right-5
            rounded-full
            bg-[#07182D]/75
            px-3
            py-1.5
            text-xs
            font-semibold
            text-white
            backdrop-blur
          "
        >
          {activeIndex + 1} / {validImages.length}
        </div>
      </div>

      {validImages.length > 1 && (
        <div
          className="
            mt-3
            flex
            gap-2
            overflow-x-auto
            pb-1

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {validImages
            .slice(0, 12)
            .map(
              (
                image,
                index
              ) => (
                <button
                  type="button"
                  key={image}
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  className={`
                    h-[72px]
                    w-[100px]
                    shrink-0
                    overflow-hidden
                    rounded-xl
                    border-2

                    ${
                      activeIndex === index
                        ? "border-[#F58220]"
                        : "border-transparent"
                    }
                  `}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt=""
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                </button>
              )
            )}
        </div>
      )}
    </div>
  );
}