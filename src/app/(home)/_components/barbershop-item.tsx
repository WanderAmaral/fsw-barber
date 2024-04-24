'use client'
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const router = useRouter(); 

  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`);
  };

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className=" px-1 py-0">
        <div className="w-full h-[159px] relative">
          <div className="absolute top-2 left-2 z-50">
            <Badge
              className="flex items-center gap-1 opacity-90"
              variant="secondary"
            >
              <StarIcon size={16} className="text-primary fill-primary" />
              <span className="text-xs">5,0</span>
            </Badge>
          </div>
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            height={0}
            width={0}
            sizes="100vw"
            className="rounded-2xl"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <div className="px-3 pb-3">
          <h2 className="font-bold mt-2 text-ellipsis overflow-hidden  text-nowrap">
            {barbershop.name}
          </h2>
          <p className="text-sm text-gray-400 text-ellipsis overflow-hidden text-nowrap">
            {barbershop.address}
          </p>
          <Button
            onClick={handleBookingClick}
            variant="secondary"
            className="w-full mt-3"
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
