import { View } from "react-native";
import { HeaderSection } from "~/components/header-section";
import { ArrowLeft } from "lucide-react-native";
import { useRouter, Stack } from "expo-router";

export default function NewEstimate() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-white mt-20">
        <View className="ml-4">
          <ArrowLeft
            className="p-10 "
            color="#1B512D"
            onPress={() => router.back()}
          />
        </View>

        <HeaderSection
          title="New estimate"
          description="Create a new estimate for your client in seconds."
        />
      </View>
    </>
  );
}
