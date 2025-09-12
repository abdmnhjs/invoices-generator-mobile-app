import { Stack } from "expo-router";
import { View, ScrollView } from "react-native";
import { HeaderTab } from "~/components/header-tab";
import { LineChart } from "react-native-gifted-charts";

export default function Dashboard() {
  const data = [
    { value: 50, label: "Jan" },
    { value: 80, label: "Feb" },
    { value: 90, label: "Mar" },
    { value: 70, label: "Apr" },
    { value: 60, label: "May" },
    { value: 50, label: "Jun" },
    { value: 40, label: "Jul" },
    { value: 30, label: "Aug" },
    { value: 20, label: "Sept" },
    { value: 10, label: "Oct" },
    { value: 0, label: "Nov" },
    { value: 0, label: "Dec" },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <View className="flex-col gap-4 px-4 mt-10">
          <HeaderTab title="Dashboard" description="Track your earnings." />
          <View className="mx-auto">
            <LineChart
              data={data}
              isAnimated={true}
              xAxisLabelTextStyle={{ color: "gray" }}
              xAxisLabelsVerticalShift={10}
              spacing={40}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
