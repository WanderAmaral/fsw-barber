import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import MenuSheet from "./menu-sheet";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="py-6 px-5 flex items-center justify-between">
        <Link href={"/"}>
          {/* <Image src={"/logo.png"} alt="logo" height={22} width={130} /> */}
          <h1 className="font-bold text-2xl">
            <span className="text-primary">FSW </span>BARBER
          </h1>
        </Link>
        <MenuSheet />
      </CardContent>
    </Card>
  );
};

export default Header;
