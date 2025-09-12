import { Stack } from "expo-router";
import { View, ScrollView, Text } from "react-native";
import { HeaderTab } from "~/components/header-tab";
import { LineChart } from "react-native-gifted-charts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "~/lib/config";
import { Invoice } from "~/types/invoices/invoice";

export default function Dashboard() {
  const { data } = useQuery<Invoice[]>({
    queryKey: ["invoices"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/invoices`);
      return response.data;
    },
  });

  const months = new Map<number, string>();
  months.set(0, "Jan.");
  months.set(1, "Feb.");
  months.set(2, "Mar.");
  months.set(3, "Apr.");
  months.set(4, "May");
  months.set(5, "Jun.");
  months.set(6, "Jul.");
  months.set(7, "Aug.");
  months.set(8, "Sep.");
  months.set(9, "Oct.");
  months.set(10, "Nov.");
  months.set(11, "Dec.");

  const getLast6MonthsTotals = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const monthTotals = new Array(6).fill(0);

    const monthIndices = Array.from({ length: 6 }, (_, i) => {
      const monthIndex = currentMonth - i;
      return monthIndex < 0 ? monthIndex + 12 : monthIndex;
    }).reverse();

    data?.forEach((invoice: Invoice) => {
      const invoiceMonth = new Date(invoice.createdAt).getMonth();
      const monthIndex = monthIndices.indexOf(invoiceMonth);
      if (monthIndex !== -1) {
        monthTotals[monthIndex] += Number(invoice.totalPriceWithoutVat);
      }
    });

    return monthTotals.map((total, index) => ({
      value: Number(total),
      label: months.get(monthIndices[index]) ?? "",
    }));
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <View className="flex-col gap-4 px-4 mt-10">
          <HeaderTab title="Dashboard" description="Track your earnings." />
          <View>
            <LineChart
              areaChart
              data={getLast6MonthsTotals()}
              height={250}
              width={300}
              hideDataPoints={false}
              color="#1B512D"
              thickness={2}
              startFillColor="#1B512D"
              startOpacity={0.8}
              endFillColor="#fff"
              endOpacity={0.3}
              initialSpacing={20}
              endSpacing={20}
              xAxisLabelTextStyle={{ color: "#666" }}
              yAxisLabelWidth={60}
              formatYLabel={(value) =>
                `${Number(value).toLocaleString("en-US")}$`
              }
              maxValue={Math.max(
                ...getLast6MonthsTotals().map((item) => item.value)
              )}
              stepValue={Math.ceil(
                Math.max(...getLast6MonthsTotals().map((item) => item.value)) /
                  4
              )}
              yAxisThickness={0}
              horizontalRulesStyle={{
                width: 0.3,
                color: "#66666620",
                type: "solid",
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
