"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";

const NameUser = () => {
  const session = useSession();
  return (
    <div className="py-6 px-5">
      <h1 className="text-xl font-bold">Olá, {session.data?.user?.name}!</h1>
      <p className=" capitalize text-sm">
        {format(new Date(), "EEEE, d 'de'  MMMM", { locale: ptBR })}
      </p>
    </div>
  );
};

export default NameUser;
