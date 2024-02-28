"use client";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { use, useEffect } from "react";

const MenuSheet = () => {
  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogOutClick = async () => {
    await signOut();
  };
  const { data, status } = useSession();

  useEffect(() => {
    console.log({ data });
    console.log({ status });
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="border-b pb-7">
          <SheetTitle className="text-lg">Menu</SheetTitle>
        </div>
        {status === "unauthenticated" && (
          <div className="w-full pt-3 flex">
            <Button
              onClick={handleLoginClick}
              variant={"secondary"}
              className="w-full justify-start text-xs"
            >
              Fazer Login
            </Button>
          </div>
        )}
        {status === "authenticated" && (
          <div className="text-sm w-full pt-3 ">Olá {data.user?.name}</div>
          
        )}
        <div className="w-full pt-3 flex">
          <Button
            variant={"secondary"}
            className="w-full justify-start text-xs"
          >
            Inicio
          </Button>
        </div>
        <div className="w-full pt-3 flex">
          <Button
            variant={"secondary"}
            className="w-full justify-start text-xs"
          >
            Agendamentos
          </Button>
        </div>
        {status === "authenticated" && (
          <div className="w-full pt-3 flex">
            <Button
              onClick={handleLogOutClick}
              variant={"secondary"}
              className="w-full justify-start text-xs"
            >
              Sair
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
