import Image from "next/image";
import Link from "next/link";

export default function Logo() {
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
        src="/images/logo.png"
        alt="SicilyTrip"
        priority
        width={180}
        height={54}
        className="
          h-auto
          w-[120px]
          object-contain

          sm:w-[130px]

          lg:w-[145px]

          xl:w-[150px]
        "
      />
    </Link>
  );
}