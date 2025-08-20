import { ChartSpline, ReceiptText } from "lucide-react-native";
import { Tabs } from "expo-router";
import { MyTabBar } from "~/components/ui/tab-bar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1B512D",
        headerShown: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <ChartSpline size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="invoices"
        options={{
          title: "Invoices",
          tabBarIcon: ({ color }) => <ReceiptText size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
