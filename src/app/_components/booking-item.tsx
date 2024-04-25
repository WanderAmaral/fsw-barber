"use client";
import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { LoaderIcon, Smartphone } from "lucide-react";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [isDeleteLoading, setDeleteIsLoading] = useState(false);

  const bookingIsConfirmed = isFuture(booking.date);

  const handleCancelBookingClick = async () => {
    setDeleteIsLoading(true)
    try {
      setSheetIsOpen(false);
      await cancelBooking(booking.id);

      toast.success("Reserva cancelada com sucesso");
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteIsLoading(false);
    }
  };

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Card className="mb-3 min-w-full">
          <CardContent className=" flex  py-0 px-0">
            <div className="flex flex-col gap-2 py-3 flex-[3] pl-4">
              <Badge
                variant={bookingIsConfirmed ? "default" : "secondary"}
                className="w-fit"
              >
                {bookingIsConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h1 className="font-bold">{booking.service.name}</h1>
              <div className="flex items-center gap-4">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
                <p className="text-sm">{booking.barbershop.name}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-solid border-secondary  flex-1">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className=" px-4 text-left py-6 border-b border-solid border-secondary">
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>
        <div className="h-[180px] w-full relative">
          <Image
            src={"/barber-adress.png"}
            alt={booking.barbershop.name}
            fill
            style={{ objectFit: "contain" }}
            className="px-4"
          />
        </div>
        <div className="px-4 pb-2">
          <Badge
            variant={bookingIsConfirmed ? "default" : "secondary"}
            className="w-fit"
          >
            {bookingIsConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className="my-5">
            <CardContent className="p-3  flex flex-col gap-3 text-gray-400">
              <div className="flex justify-between">
                <h2 className="font-bold text-sm text-white">
                  {booking.service.name}
                </h2>
                <h3 className="font-bold text-sm text-white">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </h3>
              </div>

              <div className="flex justify-between">
                <h3>Data</h3>
                <h4 className="text-white">
                  {format(booking.date, "dd 'de' MMMM", { locale: ptBR })}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3>Horário</h3>
                <h4 className="text-white">{format(booking.date, "hh:mm")}</h4>
              </div>

              <div className="flex justify-between">
                <h3>Barbearia</h3>
                <h4 className="text-white">{booking.barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Smartphone size={20} />
              <p className="text-sm text-gray-400">11 98204-5108</p>
            </div>

            <Button variant={"outline"}>Copiar</Button>
          </div>
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Smartphone size={20} />
              <p className="text-sm text-gray-400">11 94002-8922</p>
            </div>

            <Button variant={"outline"}>Copiar</Button>
          </div>
          <SheetFooter className="flex-row gap-3">
            <SheetClose asChild>
              <Button variant={"secondary"} className="w-full">
                Voltar
              </Button>
            </SheetClose>
            <Button
              onClick={handleCancelBookingClick}
              variant={"destructive"}
              disabled={!bookingIsConfirmed || isDeleteLoading}
              className="w-full"
            >
              {isDeleteLoading && (
                <LoaderIcon className="wr-2 h-4 w-4 animate-spin" />
              )}
              Cancelar
            </Button>
          </SheetFooter>
          <div className="flex gap-3"></div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
