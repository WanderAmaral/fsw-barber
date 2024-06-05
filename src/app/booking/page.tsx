import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { authOptions } from "../_lib/auth";

const Booking = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const [confirmedBookings, fineshedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },

      include: {
        service: true,
        barbershop: true,
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },

      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <>
      <Header />

      <h1 className="font-bold text-xl md:text-center px-4 pt-4 md:py-4">Agendamentos</h1>
      <div className="px-5 py-6 md:container md:max-w-[50%] md:grid md:grid-cols-2 md:gap-4">
        <div>
          {confirmedBookings.length > 0 ? (
            <>
              <h2 className="py-3 text-gray-400 uppercase text-sm font-bold">
                Confirmados
              </h2>

              <div className="flex flex-col gap-3 cursor-pointer ">
                {confirmedBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div>
          {fineshedBookings.length > 0 ? (
            <>
              <h2 className="py-3 text-gray-400 uppercase text-sm font-bold ">
                Finalizados
              </h2>
              <div className="flex flex-col gap-3 cursor-pointer">
                {fineshedBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            </>
          ) : null}
        </div>

        {/* Se tiver algum item na lista confirmedBooking maior que 0, ele renderiza o titulo e o componente */}
      </div>
    </>
  );
};

export default Booking;
