import { Badge } from "~/components/ui/badge";
import { MoveUpRight, MoveDownRight } from "lucide-react-native";
import { View, Text } from "react-native";

export const EarningsThisMonth = ({
  currentMonthTotal,
  last6MonthsTotals,
}: {
  currentMonthTotal: string;
  last6MonthsTotals: { increased: boolean; percentage: number }[];
}) => {
  return (
    <View className="flex-col">
      <Text className="text-lg text-[#1B512D]/60">Earnings this month</Text>
      <View className="flex-row items-center gap-2">
        <Text className="text-3xl font-bold text-[#1B512D]">
          {currentMonthTotal}$
        </Text>
        <Badge
          className={`${
            last6MonthsTotals[5].increased ? "bg-[#1B512D]" : "bg-[#FF0000]"
          } rounded-full`}
        >
          {last6MonthsTotals[5].increased ? (
            <MoveUpRight color="#fff" size={16} />
          ) : (
            <MoveDownRight color="#fff" size={16} />
          )}
          <Text className="text-sm font-bold text-white flex-row items-center gap-1">
            {last6MonthsTotals[5].percentage.toFixed(1)}%
          </Text>
        </Badge>
      </View>
    </View>
  );
};
