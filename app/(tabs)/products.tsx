import { Stack, useRouter } from "expo-router";
import { CirclePlus } from "lucide-react-native";
import { View, Text, ScrollView } from "react-native";
import { HeaderTab } from "~/components/header-tab";
import { Button } from "~/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "types/product";
import { ProductCard } from "~/components/cards/product-card";
import { API_URL } from "~/lib/config";

export default function Products() {
  const router = useRouter();
  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <View className="flex-col gap-4 px-4 mt-10">
          <HeaderTab
            title="Products"
            description="Manage your products for your invoices."
          />

          <Button
            className="flex-row items-center gap-2"
            variant="outline"
            onPress={() => router.push("/products/add")}
          >
            <CirclePlus color="#1B512D" />
            <Text className="font-semibold text-[#1B512D]">
              Add a new product
            </Text>
          </Button>

          <View className="flex-col gap-4">
            {products?.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
