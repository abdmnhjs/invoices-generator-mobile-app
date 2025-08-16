import { CirclePlus } from "lucide-react-native";
import { View, Text } from "react-native";
import { Button } from "~/components/ui/button";
import { HeaderTab } from "~/components/header-tab";
import { useRouter } from "expo-router";

export default function Invoices() {
  const router = useRouter();

  return (
    <View className="mt-10">
      <HeaderTab
        title="Invoices"
        description="Create, download or share your invoices for your customers."
      />

      <Button
        className="flex-row items-center gap-2 mt-10 mx-5"
        variant="outline"
        onPress={() => router.push("/invoices/new")}
      >
        <CirclePlus color="#1B512D" />
        <Text className="font-semibold text-[#1B512D]">Add a new invoice</Text>
      </Button>
    </View>
  );
}
