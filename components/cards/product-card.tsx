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

export const ProductCard = (product: Product) => {
  return (
    <Card className="w-full max-w-sm" key={product.id.toString()}>
      <CardHeader>
        <View className="flex-1 gap-1.5">
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.unitPrice}$</CardDescription>
        </View>
      </CardHeader>
      <CardFooter>
        <Button variant="secondary">
          <Text>Edit</Text>
        </Button>
        <Button variant="destructive">
          <Text>Delete</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};
