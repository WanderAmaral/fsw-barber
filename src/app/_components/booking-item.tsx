import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const bookingIsConfirmed = isFuture(booking.date);

  return (
    <Card className="mb-3">
      <CardContent className=" flex  py-0 px-0">
        <div className="flex flex-col gap-2 py-3 flex-[3] pl-4">
          <Badge variant={bookingIsConfirmed ? 'default' : 'secondary'} className="w-fit">
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
  );
};

export default BookingItem;
