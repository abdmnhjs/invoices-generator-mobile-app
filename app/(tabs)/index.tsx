import { View, Text } from "react-native";
import { HeaderTab } from "~/components/header-tab";

export default function Statistics() {
  return (
    <View className="mt-10">
      <HeaderTab title="Statistics" description="Track your earnings." />
    </View>
  );
}
