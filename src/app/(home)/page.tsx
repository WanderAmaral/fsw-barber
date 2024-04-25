import Header from "../_components/header";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { db } from "../_lib/prisma";

import NameUser from "./_components/name-user";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, confimedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : [],
  ]);

  return (
    <div>
      <Header />

      <div className="py-6 px-5">
        <h1 className="text-xl font-bold">
          {session?.user
            ? `Olá ${session.user.name?.split(" ")[0]}`
            : "Olá, vamos agendar um corte hoje?"}
        </h1>
        <p className=" capitalize text-sm">
          {format(new Date(), "EEEE, d 'de'  MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="px-5 py-6">
        <Search />
      </div>
      {confimedBookings.length > 0 && (
        <div className="px-5">
          <h1 className="text-[#838896] mb-3 text-sm uppercase">
            Agendamentos
          </h1>
          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden ">
            {confimedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}
      <div className="mt-6">
        <h1 className="text-[#838896] mb-3 text-sm uppercase px-5">
          Recomendados
        </h1>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden px-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <div className="mt-6 mb-[4.5rem]">
        <h1 className="text-[#838896] mb-3 text-sm uppercase px-5">
          Populares
        </h1>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden px-4 ">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
