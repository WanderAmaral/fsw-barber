import { Card, CardContent } from "./ui/card";
import MenuSheet from "./menu-sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { Calendar, User2Icon } from "lucide-react";
import Search from "../(home)/_components/search";

const Header = () => {
  return (
    <Card>
      <CardContent className="py-6 px-5 flex items-center justify-between">
        <Link href={"/"}>
          <h1 className="font-bold text-2xl">
            <span className="text-primary">FSW </span>BARBER
          </h1>
        </Link>
        <div className=" md:hidden lg:px-0">
          <MenuSheet />
        </div>
        <div className="hidden md:block w-[40%]">
          <Search />
        </div>
        <div className="hidden md:block ">
          <div className="flex gap-3 ">
            <Button variant={"secondary"} className="gap-2" asChild>
              <Link href={"/booking"}>
                <Calendar size={16} />
                Agendamentos
              </Link>
            </Button>
            <Button className="gap-2">
              <User2Icon size={16} />
              Fazer Login
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
