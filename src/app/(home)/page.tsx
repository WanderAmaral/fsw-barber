import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format } from "date-fns";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="pt-5 px-5">
        <h1 className="text-xl font-bold">Olá, Miguél</h1>
        <p className=" capitalize text-sm">
          {format(new Date(), "EEEE, d 'de'  MMMM", { locale: ptBR })}
        </p>
      </div>
    </div>
  );
}
