import { View, Text } from "react-native";
import { HeaderTab } from "~/components/header-tab";
import { Button } from "~/components/ui/button";
import { CirclePlus } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function Estimates() {
  const router = useRouter();

  return (
    <View className="mt-10">
      <HeaderTab
        title="Estimates"
        description="Create, download or share your estimates for your customers."
      />
      <Button
        className="flex-row items-center gap-2 mt-10 mx-5"
        variant="outline"
        onPress={() => router.push("/estimates/new")}
      >
        <CirclePlus />
        <Text className="font-semibold">Add a new estimate</Text>
      </Button>
    </View>
  );
}
