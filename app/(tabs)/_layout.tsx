import { ChartSpline, FileSpreadsheet, ReceiptText } from "lucide-react-native";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#1B512D" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color }) => <ChartSpline size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="estimates"
        options={{
          title: "Estimates",
          tabBarIcon: ({ color }) => (
            <FileSpreadsheet size={28} color={color} />
          ),
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
