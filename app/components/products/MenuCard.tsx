// components/MenuCard.tsx
import Image from "next/image";
import { Button } from "../ui/Button";

interface MenuCardProps {
  imageSrc: string;
  name: string;
  onClick?: () => void;
  className?: string;
}

export default function MenuCard({
  imageSrc,
  name,
  onClick,
  className,
}: MenuCardProps) {
  return (
    <div
      className={`group relative flex flex-col items-center justify-center cursor-pointer
        w-[327px] h-[217px]                /* Mobile */
        md:w-[223px] sm:h-[217px]          /* Tablet */
        lg:w-[350px] lg:h-[284px]          /* Desktop */
        ${className || ""}
      `}
    >
      {/* Background Block */}
      <div
        className="absolute bottom-0 rounded-lg bg-[#F1F1F1] transition-colors duration-300
          group-hover:bg-[#e8e8e8]
          w-[327px] h-[165px]              /* Mobile */
          sm:w-[223px] sm:h-[165px]        /* Tablet */
          lg:w-[350px] lg:h-[204px]        /* Desktop */
        "
      />

      {/* Product Image */}
      <div className="z-10 -mt-10 flex flex-col items-center transition-transform duration-300 group-hover:scale-105">
        <Image
          src={imageSrc}
          alt={name}
          width={200}
          height={200}
          className="object-contain select-none pointer-events-none
            drop-shadow-[0_30px_35px_rgba(0,0,0,0.25)]
           w-[79.92px] sm:w-[140px] sm:h-auto
            lg:w-[200px]"
        />
      </div>

      {/* Product Name */}
      <h6 className="z-10 mt-4 text-lg font-semibold text-center text-black uppercase">
        {name}
      </h6>

      {/* Button */}
      <Button
        variant="shop"
        onClick={onClick}
        className="z-10 text-[13px] flex items-center gap-2 transition-colors duration-300 group-hover:text-[#D87D4A]"
      >
        SHOP
        <svg
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.707153 0.707031L5.70715 5.70703L0.707153 10.707"
            stroke="#D87D4A"
            strokeWidth="2"
          />
        </svg>
      </Button>
    </div>
  );
}
