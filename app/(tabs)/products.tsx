import { useRouter } from "expo-router";
import { CirclePlus } from "lucide-react-native";
import { View, Text } from "react-native";
import { HeaderTab } from "~/components/header-tab";
import { Button } from "~/components/ui/button";

export default function Products() {
  const router = useRouter();

  return (
    <View className="mt-10">
      <HeaderTab
        title="Products"
        description="Manage your products for your invoices."
      />

      <Button
        className="flex-row items-center gap-2 mt-10 mx-5"
        variant="outline"
        onPress={() => router.push("/products/new")}
      >
        <CirclePlus color="#1B512D" />
        <Text className="font-semibold text-[#1B512D]">Add a new product</Text>
      </Button>
    </View>
  );
}
