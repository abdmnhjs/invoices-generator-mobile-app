import { View, Text } from "react-native";
import { HeaderTab } from "~/components/header-tab";

export default function Dashboard() {
  return (
    <View className="mt-10">
      <HeaderTab title="Dashboard" description="Track your earnings." />
    </View>
  );
}
