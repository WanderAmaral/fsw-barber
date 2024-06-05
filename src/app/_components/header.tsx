"use client";
import { Card, CardContent } from "./ui/card";
import MenuSheet from "./menu-sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { Calendar, User2Icon } from "lucide-react";
import Search from "../(home)/_components/search";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Avatar, AvatarImage } from "./ui/avatar";

const Header = () => {
  const { data, status } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogOutClick = async () => {
    await signOut();
  };
  const firstName = data?.user?.name?.["0"];

  return (
    <Card>
      <CardContent className="py-4 px-5 flex items-center justify-between">
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
          <div className="flex gap-3 items-center">
            <Button variant={"secondary"} className="gap-2" asChild>
              <Link href={"/booking"}>
                <Calendar size={16} />
                Agendamentos
              </Link>
            </Button>
            {status === "unauthenticated" && (
              <Button className="gap-2" onClick={handleLoginClick}>
                <User2Icon size={16} />
                Perfil
              </Button>
            )}
            {data?.user ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="text-sm w-full py-5 hover:opacity-80 cursor-pointer">
                    <div className="flex items-center gap-3 justify-between">
                      <div className=" flex items-center gap-3">
                        <Avatar className="flex items-center border justify-center">
                          <AvatarImage src={data.user?.image ?? firstName} />
                        </Avatar>
                        {data.user?.name}
                      </div>
                    </div>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Sair</AlertDialogTitle>
                    <AlertDialogDescription>
                      Deseja sair da plataforma?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-row gap-3">
                    <AlertDialogCancel className="w-full mt-0">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="w-full"
                      onClick={handleLogOutClick}
                    >
                      Sair
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <></>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
