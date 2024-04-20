"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDateTimeLis } from "../_helpers/hours";

interface ServiceItemProps {
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hour, setHours] = useState<string | undefined>();

  const handleCalendarClick = (date: Date | undefined) => {
    setDate(date);
    setHours(undefined);
  };

  const handleClickHour = (time: string) => {
    setHours(time);
  };

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }
  };

  const timeList = useMemo(() => {
    return date ? generateDateTimeLis(date) : [];
  }, [date]);

  console.log(timeList);

  return (
    <Card>
      <CardContent className="p-3 w-full">
        <div className="flex gap-4 items-center w-full">
          <div className="relative h-[110px] w-[110px] min-w-[110px] min-h-[110px] max-w-[110px]">
            <Image
              className="rounded-lg"
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-sm">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"secondary"} onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-secondary border-solid">
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>
                  <Calendar
                  
                    mode="single"
                    selected={date}
                    onSelect={handleCalendarClick}
                    className="mt-6"
                    locale={ptBR}
                    styles={{ caption: { textTransform: "capitalize" } }}
                    fromDate={new Date()}
                    
                  />
                  {date && (
                    <div className="py-6 px-5 border-y border-solid border-secondary flex overflow-x-auto gap-3">
                      {timeList.map((time) => (
                        <Button
                          onClick={() => handleClickHour(time)}
                          className="rounded-full"
                          variant={hour === time ? "default" : "outline"}
                          key={time}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
