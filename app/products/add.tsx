import { ArrowLeft } from "lucide-react-native";
import { useRouter, Stack } from "expo-router";
import { ScrollView, View } from "react-native";
import { HeaderSection } from "~/components/header-section";
import { ProductForm } from "~/components/forms/product-form";

export default function NewProduct() {
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
          title="New product"
          description="Create a new product for your invoices."
        />

        <View className="mt-4 mx-4">
          <ProductForm />
        </View>
      </ScrollView>
    </>
  );
}
