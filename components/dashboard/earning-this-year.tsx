import { View, Text } from "react-native";

export const EarningsThisYear = ({
  currentYearTotal,
}: {
  currentYearTotal: string;
}) => {
  return (
    <View className="flex-col">
      <Text className="text-lg text-[#1B512D]/60">Earnings this year</Text>
      <Text className="text-3xl font-bold text-[#1B512D]">
        {currentYearTotal}$
      </Text>
    </View>
  );
};
