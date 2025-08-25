import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { View, Text, ScrollView } from "react-native";
import { Button } from "~/components/ui/button";
import { ProductForm } from "~/components/forms/product-form";
import { HeaderSection } from "~/components/header-section";
import { API_URL } from "~/lib/config";
import { defaultValuesEditForm } from "~/lib/products/edit/default-values-edit";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  console.log("Product ID:", id);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-xl font-semibold text-[#1B512D]">
            Loading...
          </Text>
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-xl font-semibold text-red-500 mb-4">
            Error:{" "}
            {axios.isAxiosError(error)
              ? error.response?.data?.message || "Failed to load product"
              : "Failed to load product"}
          </Text>
          <Button
            className="bg-[#1B512D] rounded-md px-4 py-2"
            onPress={() => router.back()}
          >
            <Text className="text-white font-medium">Go Back</Text>
          </Button>
        </View>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-xl font-semibold text-[#1B512D] mb-4">
            Product not found
          </Text>
          <Button
            className="bg-[#1B512D] rounded-md px-4 py-2"
            onPress={() => router.back()}
          >
            <Text className="text-white font-medium">Go Back</Text>
          </Button>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 bg-white my-20">
        <View className="ml-4">
          <ArrowLeft
            className="p-10 "
            color="#1B512D"
            onPress={() => router.back()}
          />
        </View>

        <HeaderSection
          title="Edit product"
          description="Edit the product for your invoices."
        />

        <View className="mt-4 mx-4">
          <ProductForm
            defaultValues={defaultValuesEditForm(product)}
            id={Number(id)}
            ctaText="Edit Product"
          />
        </View>
      </ScrollView>
    </>
  );
}
