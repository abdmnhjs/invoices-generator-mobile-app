import { View, Text } from "react-native";

export const InvoicesThisMonth = ({
  invoicesThisMonth,
}: {
  invoicesThisMonth: number;
}) => {
  return (
    <View className="flex-col">
      <Text className="text-lg text-[#1B512D]/60">Invoices this month</Text>
      <Text className="text-3xl font-bold text-[#1B512D]">
        {invoicesThisMonth}
      </Text>
    </View>
  );
};
