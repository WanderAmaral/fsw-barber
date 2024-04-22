import BookingItem from "../_components/booking-item";
import Header from "../_components/header";

const Booking = () => {
  return (
    <>
      <Header />
      <div className="px-4 pt-5">
        <h1 className="text-white text-xl">Agendamentos</h1>
        <p className="pt-5 pb-4 text-gray-400 uppercase text-xs">Confirmados</p>
        <BookingItem />
        <p className="pt-5 pb-4 text-gray-400 uppercase text-xs">Finalizados</p>
        <BookingItem />
        <BookingItem />
      </div>
    </>
  );
};

export default Booking;
