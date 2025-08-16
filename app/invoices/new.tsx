import { ScrollView, View } from "react-native";
import { HeaderSection } from "~/components/header-section";
import { ArrowLeft } from "lucide-react-native";
import { useRouter, Stack } from "expo-router";
import { InvoiceForm } from "~/components/forms/invoice-form";

export default function NewInvoice() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 bg-white mt-20">
        <View className="ml-4">
          <ArrowLeft
            className="p-10 "
            color="#1B512D"
            onPress={() => router.back()}
          />
        </View>

        <HeaderSection
          title="New invoice"
          description="Create a new invoice for your customer in seconds."
        />

        <View className="mt-4 mx-4">
          <InvoiceForm />
        </View>
      </ScrollView>
    </>
  );
}
