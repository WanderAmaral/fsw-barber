import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import MenuSheet from "./menu-sheet";

const Header = () => {
  return (
    <Card>
      <CardContent className="py-6 px-5 flex items-center justify-between">
        <Image src={"/Logo.png"} alt="logo" height={22} width={130} />
        <MenuSheet />
      </CardContent>
    </Card>
  );
};

export default Header;
