import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { Smartphone } from "lucide-react";
import Image from "next/image";

interface BarbershopInfoDesktopProps {
  barbershop: Barbershop;
}

const BarbershopInfoDesktop = ({ barbershop }: BarbershopInfoDesktopProps) => {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col gap-3 ">
        <div className=" w-full ">
          <Image
            src={"/barber-adress.png"}
            alt={"barbearia"}
            height={0}
            width={0}
            sizes="100vh"
            style={{ objectFit: "fill" }}
            className="w-full"
          />
        </div>
        <h1 className="text-lg text-gray-200 uppercase">Sobre nós</h1>
        <p className="text-sm text-zinc-500 text-justify border-b border-solid pb-4">{`Bem-vindo à ${barbershop.name}, onde tradição encontra estilo. Nossa equipe de mestres barbeiros transforma cortes de cabelo e barbas em obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo e uma comunidade unida.`}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Smartphone size={20} />
            <p className="text-sm text-gray-400">11 98204-5108</p>
          </div>

          <Button variant={"secondary"}>Copiar</Button>
        </div>
        <div className="flex justify-between items-center py-4  border-b border-solid">
          <div className="flex items-center gap-2">
            <Smartphone size={20} />
            <p className="text-sm text-gray-400">11 94002-8922</p>
          </div>

          <Button variant={"secondary"}>Copiar</Button>
        </div>
        <div className="flex justify-between">
          <h1 className="text-sm text-gray-300">Em parceria com </h1>
          
            <h1 className="font-bold text-base">
              <span className="text-primary">FSW </span>BARBER
            
          </h1>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopInfoDesktop;
