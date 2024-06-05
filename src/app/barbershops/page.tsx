import { redirect } from "next/navigation";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import Search from "../(home)/_components/search";

interface BarbershopPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  if (!searchParams.search) {
    return redirect("/");
  }
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });
  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <div className="py-6 md:hidden">
        <Search defaultValues={{search: searchParams.search}}/>
        </div>
        <h1 className="text-sm font-bold text-gray-400 uppercase">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>
        <div className="grid grid-cols-2 md:flex mt-4 gap-3">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BarbershopPage;
