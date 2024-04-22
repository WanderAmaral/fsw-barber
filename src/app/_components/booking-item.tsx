import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
  return (
    <Card className="mb-3">
      <CardContent className="p-3 flex justify-between py-0">
        <div className="flex flex-col gap-2 py-3">
          <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">
            Confirmado
          </Badge>
          <h1 className="font-bold">Corte de cabelo</h1>
          <div className="flex items-center gap-4">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png" />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <p className="text-sm">Vintage Barber</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l border-solid border-secondary px-4">
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">10:47</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
