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
import axios from "axios";
import { API_URL } from "~/lib/config";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export const ProductCard = (product: Product) => {
  const queryClient = useQueryClient();
  return (
    <Card className="w-full flex-col" key={product.id.toString()}>
      <CardHeader className="flex-row">
        <View className="flex-col gap-2">
          <CardTitle className="text-lg font-semibold text-[#1B512D]">
            {product.name}
          </CardTitle>
          <View className="flex-col gap-1">
            <CardDescription className="text-sm text-[#1B512D]">
              Unit price: {product.unitPrice}$
            </CardDescription>
            <CardDescription className="text-sm text-[#1B512D]">
              Total price: {product.totalPrice}$
            </CardDescription>
          </View>
        </View>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="outline"
          className="flex-row items-center gap-2 w-full"
          onPress={() =>
            router.push({
              pathname: "/products/edit/[id]",
              params: { id: product.id.toString() },
            })
          }
        >
          <SquarePen color="#1B512D" />
          <Text className="font-semibold text-[#1B512D]">Edit</Text>
        </Button>
        <Button
          variant="destructive"
          className="flex-row items-center gap-2 w-full"
          onPress={async () => {
            try {
              await axios.delete(`${API_URL}/products/${product.id}`);
              queryClient.invalidateQueries({ queryKey: ["products"] });
              console.log("Product deleted successfully");
            } catch (error) {
              if (axios.isAxiosError(error)) {
                console.error("API Error:", error.response?.data);
              } else {
                console.error("Error:", error);
              }
            }
          }}
        >
          <Trash color="#FFF" />
          <Text className="font-semibold">Delete</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};
