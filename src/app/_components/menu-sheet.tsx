import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const MenuSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="">
          <MenuIcon size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="border-b pb-7">
          <SheetTitle className="text-lg">Menu</SheetTitle>
        </div>
        <div className="w-full pt-3 flex">
          <Button variant={"secondary"} className="w-full justify-start text-xs">
            Fazer Login
          </Button>
        </div>
        <div className="w-full pt-3 flex">
          <Button variant={"secondary"} className="w-full justify-start text-xs">
            Inicio
          </Button>
        </div>
        <div className="w-full pt-3 flex">
          <Button variant={"secondary"} className="w-full justify-start text-xs">
            Agendamentos
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
