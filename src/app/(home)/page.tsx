import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format } from "date-fns";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { db } from "../_lib/prisma";

export default async function Home() {
  const barbershop = await db.barbershop.findMany({});
  return (
    <div>
      <Header />

      <div className="py-6 px-5">
        <h1 className="text-xl font-bold">Olá, Miguél</h1>
        <p className=" capitalize text-sm">
          {format(new Date(), "EEEE, d 'de'  MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="px-5 py-6">
        <Search />
      </div>
      <div className="px-5">
        <h1 className="text-[#838896] mb-3 text-sm uppercase">Agendamentos</h1>
        <BookingItem />
      </div>
      <div className="mt-6">
        <h1 className="text-[#838896] mb-3 text-sm uppercase px-5">
          Recomendados
        </h1>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden px-4">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
