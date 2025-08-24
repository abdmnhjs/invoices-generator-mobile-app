import { Stack, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { View, Text, ScrollView } from "react-native";
import { ProductForm } from "~/components/forms/product-form";
import { HeaderSection } from "~/components/header-section";

export default function EditProduct() {
  const router = useRouter();

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
          <ProductForm />
        </View>
      </ScrollView>
    </>
  );
}
