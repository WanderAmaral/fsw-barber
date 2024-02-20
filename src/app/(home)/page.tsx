import { ptBR } from "date-fns/locale";
import Header from "../_components/header";
import { format } from "date-fns";
import Search from "./_components/search";

export default function Home() {
  return (
    <div>
      <Header />

      <div className="py-6 px-5">
        <h1 className="text-xl font-bold">Olá, Miguél</h1>
        <p className=" capitalize text-sm">
          {format(new Date(), "EEEE, d 'de'  MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="px-5">
        <Search />
      </div>
    </div>
  );
}
