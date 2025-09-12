import { Stack } from "expo-router";
import { View, ScrollView } from "react-native";
import { HeaderTab } from "~/components/header-tab";
import { LineChart } from "react-native-gifted-charts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "~/lib/config";
import { TotalPerMonth } from "~/types/invoices/total-per-month";

export default function Dashboard() {
  const { data } = useQuery<TotalPerMonth[]>({
    queryKey: ["total-per-month"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/invoices/total-per-month`);
      return response.data;
    },
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <View className="flex-col gap-4 px-4 mt-10">
          <HeaderTab title="Dashboard" description="Track your earnings." />
          <View className="mx-auto">
            <LineChart
              data={data?.map((item: TotalPerMonth) => ({
                value: item.total,
                label: item.month.toString(),
              }))}
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
