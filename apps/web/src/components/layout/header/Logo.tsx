import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  solidHeader: boolean;
};

export default function Logo({ solidHeader }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="SicilyTrip Home"
      className="
        flex
        shrink-0
        items-center
      "
    >
      <Image
        src={
          solidHeader
            ? "/images/logo-sicilytrip.svg"
            : "/images/logo-sicilytrip-light.svg"
        }
        alt="SicilyTrip"
        priority
        width={208}
        height={90}
        className="
          h-[48px]
          w-auto
          object-contain

          sm:h-[52px]

          lg:h-[58px]

          drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]

          xl:h-[62px]
        "
      />
    </Link>
  );
}
