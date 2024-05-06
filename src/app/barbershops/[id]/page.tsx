import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import HeaderHome from "@/app/_components/header-home";
import Header from "@/app/_components/header";
import BarbershopInfoDesktop from "./_components/barbershop-desktop-info";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  const session = await getServerSession(authOptions);

  if (!params.id) {
    // TODO: redirecionar para home page
    return null;
  }
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    // TODO: redirecionar para home page
    return null;
  }
  return (
    <>
      <div className="">
        <div className="hidden lg:block ">
          <Header />
        </div>
        <div className="lg:flex  lg:flex-col lg:px-10">
          <div className=" lg:flex lg:justify-between lg:pt-10">
            <div>
              <BarbershopInfo barbershop={barbershop} />

              <div className="px-5 py-6 lg:px-0">
                <h1 className=" hidden lg:block pb-3">Serviços</h1>
                <div className=" lg:grid lg:grid-cols-2 lg:gap-4 flex flex-col gap-4">
                  {barbershop.services.map((service) => (
                    <ServiceItem
                      key={service.id}
                      barbershop={barbershop}
                      service={service}
                      isAuthenticated={!!session?.user}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className=" hidden lg:block lg:pl-10 w-[40%]">
              <BarbershopInfoDesktop barbershop={barbershop} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarbershopDetailsPage;
