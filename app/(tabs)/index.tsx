import { Stack } from "expo-router";
import { View, ScrollView, Text } from "react-native";
import { HeaderTab } from "~/components/header-tab";
import { LineChart } from "react-native-gifted-charts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "~/lib/config";
import { Invoice } from "~/types/invoices/invoice";
import { Badge } from "~/components/ui/badge";
import { MoveDownRight, MoveUpRight } from "lucide-react-native";
import { Chart } from "~/components/dashboard/chart";
import { EarningsThisMonth } from "~/components/dashboard/earnings-this-month";
import { EarningsThisYear } from "~/components/dashboard/earning-this-year";

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
    const currentYear = currentDate.getFullYear();
    const monthTotals = new Array(6).fill(0);

    // Créer un tableau de paires [mois, année]
    const monthYearPairs = Array.from({ length: 6 }, (_, i) => {
      let monthIndex = currentMonth - i;
      let year = currentYear;
      if (monthIndex < 0) {
        monthIndex += 12;
        year -= 1;
      }
      return { month: monthIndex, year };
    }).reverse();

    data?.forEach((invoice: Invoice) => {
      const invoiceDate = new Date(invoice.createdAt);
      const invoiceMonth = invoiceDate.getMonth();
      const invoiceYear = invoiceDate.getFullYear();

      const monthIndex = monthYearPairs.findIndex(
        (pair) => pair.month === invoiceMonth && pair.year === invoiceYear
      );

      if (monthIndex !== -1) {
        monthTotals[monthIndex] += Number(invoice.totalPriceWithoutVat);
      }
    });

    // Calculate percentage change only for the current month compared to previous month
    const currentTotal = monthTotals[monthTotals.length - 1];
    const previousTotal = monthTotals[monthTotals.length - 2];

    // Determine if there's an increase
    const increased = currentTotal > previousTotal;

    const percentageChange =
      previousTotal === 0 && currentTotal > 0
        ? 100 // Si on passe de 0 à une valeur positive, on affiche +100%
        : previousTotal > 0
        ? Math.abs(((currentTotal - previousTotal) / previousTotal) * 100)
        : 0;

    return monthTotals.map((total, index) => ({
      value: Number(total),
      label: months.get(monthYearPairs[index].month) ?? "",
      percentage: index === monthTotals.length - 1 ? percentageChange : 0,
      increased: index === monthTotals.length - 1 ? increased : false,
    }));
  };

  const getCurrentMonthTotal = () => {
    const currentMonth = new Date().getMonth();
    const currentMonthTotal = data
      ?.filter(
        (invoice: Invoice) =>
          new Date(invoice.createdAt).getMonth() === currentMonth
      )
      .reduce((acc, invoice) => acc + Number(invoice.totalPriceWithoutVat), 0);
    return currentMonthTotal?.toLocaleString("en-US");
  };

  const getCurrentYearTotal = () => {
    const currentYear = new Date().getFullYear();
    const currentYearTotal = data
      ?.filter(
        (invoice: Invoice) =>
          new Date(invoice.createdAt).getFullYear() === currentYear
      )
      .reduce((acc, invoice) => acc + Number(invoice.totalPriceWithoutVat), 0);
    return currentYearTotal?.toLocaleString("en-US");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <View className="flex-col gap-4 px-4 mt-10">
          <HeaderTab title="Dashboard" description="Track your earnings." />

          <Chart data={getLast6MonthsTotals()} />
          <View className="flex-row justify-between gap-4 mx-6">
            <EarningsThisMonth
              currentMonthTotal={getCurrentMonthTotal() ?? "0"}
              last6MonthsTotals={getLast6MonthsTotals()}
            />
            <EarningsThisYear currentYearTotal={getCurrentYearTotal() ?? "0"} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
