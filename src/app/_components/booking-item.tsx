import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
  return (
    <Card>
      <CardContent className="p-3">
        <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D]">Confirmado</Badge>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
