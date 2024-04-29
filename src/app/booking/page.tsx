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

  // mesma coisa que a query acima

  // const confirmedBookings = bookings.filter((booking) =>
  //   isFuture(booking.date)
  // );
  // const fineshedBookings = bookings.filter((booking) => isPast(booking.date));

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="font-bold text-xl">Agendamentos</h1>

        {/* Se tiver algum item na lista confirmedBooking maior que 0, ele rederiza o titulo e o componente */}
        {confirmedBookings.length > 0 ? (
          <>
            <h2 className="py-3 text-gray-400 uppercase text-sm font-bold">
              Confirmados
            </h2>

            <div className="flex flex-col gap-3">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        ) : null}
        {fineshedBookings.length > 0 ? (
          <>
            <h2 className="py-3 text-gray-400 uppercase text-sm font-bold">
              Finalizados
            </h2>
            <div className="flex flex-col gap-3">
              {fineshedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Booking;
