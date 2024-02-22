"use client";

import MenuSheet from "@/app/_components/menu-sheet";
import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };
  return (
    <div>
      <div className="h-[250px] w-full relative">
        <div className="p-6 flex justify-between z-50 absolute w-full">
          <Button
            onClick={handleClickBack}
            variant={"outline"}
            size={"icon"}
            className=""
          >
            <ChevronLeftIcon />
          </Button>
          <div className="h-full">
            <MenuSheet />
          </div>
        </div>
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="px-5 pt-3 p-6 border-b border-solid border-secundary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-3 mt-2">
          <MapPinIcon className=" text-primary" size={16} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <StarIcon className=" text-primary" size={16} />
          <p className="text-sm">
            <span>5,0 (889 vizualizações)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
