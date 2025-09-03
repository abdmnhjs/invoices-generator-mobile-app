import { Stack, useRouter } from "expo-router";
import { CirclePlus } from "lucide-react-native";
import { View, Text, ScrollView } from "react-native";
import { HeaderTab } from "~/components/header-tab";
import { Button } from "~/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Invoice } from "types/invoice";
import { API_URL } from "~/lib/config";
import { InvoiceCard } from "~/components/cards/invoice-card";

export default function Invoices() {
  const router = useRouter();
  const { data: invoices } = useQuery<Invoice[]>({
    queryKey: ["invoices"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/invoices`);
      return response.data;
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <View className="flex-col gap-4 px-4 mt-10">
          <HeaderTab
            title="Invoices"
            description="Create, download or share your invoices for your customers."
          />

          <Button
            className="flex-row items-center gap-2"
            variant="outline"
            onPress={() => router.push("/invoices/add")}
          >
            <CirclePlus color="#1B512D" />
            <Text className="font-semibold text-[#1B512D]">
              Add a new invoice
            </Text>
          </Button>

          <View className="flex-col gap-4">
            {invoices?.map((invoice) => (
              <InvoiceCard key={invoice.id} {...invoice} />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
