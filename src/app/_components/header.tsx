import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon, icons } from "lucide-react";

const Header = () => {
  return (
    <Card>
      <CardContent className="py-6 px-5 flex items-center justify-between">
        <Image src={"/Logo.png"} alt="logo" height={22} width={130} />
        <Button variant="outline" size='icon' className="h-8 w-8">
            <MenuIcon size={18}/>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;