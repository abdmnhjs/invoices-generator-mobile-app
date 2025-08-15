import { View, Text } from "react-native";
import { HeaderTab } from "~/components/header-tab";

export default function Invoices() {
  return (
    <View className="mt-10">
      <HeaderTab
        title="Invoices"
        description="Create, download or share your invoices for your clients."
      />
    </View>
  );
}
