import { View } from "react-native";
import { HeaderTab } from "~/components/header-tab";
import { ChevronLeft } from "lucide-react-native";
import { useRouter, Stack } from "expo-router";

export default function NewEstimate() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white mt-20">
        <ChevronLeft
          className="p-10"
          color="#1B512D"
          onPress={() => router.back()}
        />
        <HeaderTab
          title="New Estimate"
          description="Create a new estimate for your client."
        />
      </View>
    </>
  );
}
