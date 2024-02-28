"use client";
import { LogInIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { use, useEffect } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

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
        <div className="border-b pb-7 border-solid">
          <SheetTitle className="text-lg">Menu</SheetTitle>
        </div>
        {status === "unauthenticated" && (
          <div className="w-full pt-3 flex">
            <Button
              onClick={handleLoginClick}
              variant={"secondary"}
              className="w-full justify-start text-xs"
            >
              <LogInIcon size={18} className="mr-2"/>
              Fazer Login
            </Button>
          </div>
        )}
        {data?.user ? (
          <div className="text-sm w-full py-5 ">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={data.user?.image ?? ""} />
              </Avatar>
              Olá {data.user?.name}
              <LogInIcon onClick={handleLogOutClick} />
            </div>
          </div>
        ) : (
          <></>
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
        {/* {status === "authenticated" && (
          <div className="w-full pt-3 flex">
            <Button
              onClick={handleLogOutClick}
              variant={"secondary"}
              className="w-full justify-start text-xs"
            >
              Sair
            </Button>
          </div>
        )} */}
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
