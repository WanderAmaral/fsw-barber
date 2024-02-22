import MenuSheet from "@/app/_components/menu-sheet";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, StarIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  if (!params.id) {
    // TODO: redirecionar para home page
    return null;
  }
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!barbershop) {
    // TODO: redirecionar para home page
    return null;
  }
  return (
    <div>
      <div className="h-[250px] w-full relative">
        <div className="p-6 flex justify-between z-50 absolute w-full">
          <Button variant={"outline"} size={"icon"} className="">
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
      <div className="px-5 py-3 ">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className=" text-primary" size={16} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className=" text-primary" size={16} />
          <p className="text-sm"><span>5,0 (889 vizualizações)</span></p>
        </div>
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;
