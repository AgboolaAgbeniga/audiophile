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
      className={`group relative flex flex-col items-center cursor-pointer justify-between pb-8
        w-[327px] h-[284px] md:w-[223px] lg:w-[350px]
        ${className || ""}
      `}
    >
      {/* Background Block */}
      <div
        className="absolute bottom-0 rounded-lg bg-[#F1F1F1] transition-colors duration-300
          group-hover:bg-[#e8e8e8]
          w-[327px] h-[204px]
          sm:w-[223px]
          lg:w-[350px]
        "
      />

      {/* Product Image */}
      <div className="z-10  flex flex-col items-center transition-transform duration-300 group-hover:scale-105 mb-[43px]">
        <Image
          src={imageSrc}
          alt={name}
          width={200}
          height={200}
          className="object-contain select-none pointer-events-none
            drop-shadow-[0_30px_35px_rgba(0,0,0,0.25)]
           w-auto h-[146px]  lg:w-[200px] lg:h-[146px]"
        />
      </div>

      {/* Product Name and Button */}
      <div className="z-10 flex flex-col items-center gap-2">
        <h6 className="text-lg font-semibold text-center text-black uppercase">
          {name}
        </h6>

        <Button
          variant="shop"
          onClick={onClick}
          className="text-[13px] flex items-center gap-2 transition-colors duration-300 group-hover:text-[#D87D4A] "
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
    </div>
  );
}
