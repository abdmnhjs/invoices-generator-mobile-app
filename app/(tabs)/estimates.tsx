import { View, Text } from "react-native";
import { HeaderTab } from "~/components/header-tab";

export default function Estimates() {
  return (
    <View className="mt-10">
      <HeaderTab
        title="Estimates"
        description="Create, download or share your estimates for your clients."
      />
    </View>
  );
}
