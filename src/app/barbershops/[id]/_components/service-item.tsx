"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { generateDateTimeList } from "../_helpers/hours";
import { format, setMinutes, setHours } from "date-fns";
import { saveBooking } from "../_actions/save-booking";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../_actions/get-day-bookings";

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) => {
  const router = useRouter();
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  const { data } = useSession();

  useEffect(() => {
    if (!date) {
      return;
    }

    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(date);
      setDayBookings(_dayBookings);
    };

    refreshAvailableHours();
  }, [date]);

  const handleCalendarClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleClickHour = (time: string) => {
    setHour(time);
  };

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }
  };

  const handleSubmitBooking = async () => {
    setSubmitIsLoading(true);
    try {
      if (!date || !hour || !data?.user) {
        return;
      }

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await saveBooking({
        serveceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      });
      setSheetIsOpen(false);
      setDate(undefined);
      setHour(undefined);
      toast("Reserva realizada com sucesso", {
        description: format(newDate, "'Para' dd 'de' MMMM 'ás' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: "Vizualizar",
          onClick: () => router.push("/booking"),
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  const timeList = useMemo(() => {
    if (!date) {
      return [];
    }
    return generateDateTimeList(date).filter((time) => {
      // time: "09:00"
      // Se houver alguma reserva em "dayBookings" com a hora e minutos igual a time, não incluir
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const bookings = dayBookings.find((booking) => {
        const bookingsHour = booking.date.getHours();
        const bookingsMinutes = booking.date.getMinutes();

        return bookingsHour === timeHour && bookingsMinutes === timeMinutes;
      });
      if (!bookings) {
        return true;
      }
      return false;
    });
  }, [date, dayBookings]);

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
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
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
                    className="mt-4"
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
                  <div className="px-5 py-6 border-t border-solid text-sm ">
                    <Card>
                      <CardContent className="p-3  flex flex-col gap-3 text-gray-400">
                        <div className="flex justify-between">
                          <h2 className="font-bold text-sm text-white">
                            {service.name}
                          </h2>
                          <h3 className="font-bold text-sm text-white">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </h3>
                        </div>
                        {date && (
                          <div className="flex justify-between">
                            <h3>Data</h3>
                            <h4>
                              {format(date, "dd 'de' MMMM", { locale: ptBR })}
                            </h4>
                          </div>
                        )}
                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="">Horário</h3>
                            <h4>{hour}</h4>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3>Barbearia</h3>
                          <h4>{barbershop.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <SheetFooter>
                    <div className="px-4">
                      <Button
                        onClick={handleSubmitBooking}
                        disabled={(!hour && !date) || submitIsLoading}
                        className="w-full gap-2"
                      >
                        {submitIsLoading && (
                          <LoaderIcon className="wr-2 h-4 w-4 animate-spin" />
                        )}
                        Confirmar
                      </Button>
                    </div>
                  </SheetFooter>
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
