import type { Product } from "types/product";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { View } from "react-native";
import { Text } from "../ui/text";
import { SquarePen, Trash } from "lucide-react-native";

export const ProductCard = (product: Product) => {
  return (
    <Card className="w-full flex-col" key={product.id.toString()}>
      <CardHeader className="flex-row">
        <View className="flex-1">
          <CardTitle className="text-lg font-semibold text-[#1B512D]">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm text-[#1B512D]">
            {product.unitPrice}$
          </CardDescription>
        </View>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="outline"
          className="flex-row items-center gap-2 w-full"
        >
          <SquarePen color="#1B512D" />
          <Text className="font-semibold text-[#1B512D]">Edit</Text>
        </Button>
        <Button
          variant="destructive"
          className="flex-row items-center gap-2 w-full"
        >
          <Trash color="#FFF" />
          <Text className="font-semibold">Delete</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};
