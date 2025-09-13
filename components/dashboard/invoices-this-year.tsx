import { View, Text } from "react-native";

export const InvoicesThisYear = ({
  invoicesThisYear,
}: {
  invoicesThisYear: number;
}) => {
  return (
    <View className="flex-col">
      <Text className="text-lg text-[#1B512D]/60">Invoices this year</Text>
      <Text className="text-3xl font-bold text-[#1B512D]">
        {invoicesThisYear}
      </Text>
    </View>
  );
};
