"use client";
import { CalendarIcon, HomeIcon, LogInIcon, MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession,   } from "next-auth/react";
import { use, useEffect } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const MenuSheet = () => {
  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogOutClick = async () => {
    await signOut();
  };
  const { data, status } = useSession();

  // useEffect(() => {
  //   console.log({ data });
  //   console.log({ status });
  // });

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
              <LogInIcon size={18} className="mr-2" />
              Fazer Login
            </Button>
          </div>
        )}
        {data?.user ? (
          <div className="text-sm w-full py-5 ">
            <div className="flex items-center gap-3 justify-between">
              <div className=" flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={data.user?.image ?? ""} />
                </Avatar>
                {data.user?.name}
              </div>
              <Button variant={'ghost'} size={"icon"}>
                <LogInIcon onClick={handleLogOutClick} />
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="w-full pt-3 flex flex-col gap-3 px-2">
          <div className="flex">
            <Button
              variant={"secondary"}
              className="w-full justify-start text-xs flex"
              asChild
            >
              <Link href={"/"}>
                <HomeIcon size={18} className="mr-2" />
                Inicio
              </Link>
            </Button>
          </div>
          {data?.user && (
            <Button
              variant={"secondary"}
              className="w-full justify-start text-xs"
              asChild
            >
              <Link href={"/booking"}>
                <CalendarIcon size={18} className="mr-2" />
                Agendamentos
              </Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
