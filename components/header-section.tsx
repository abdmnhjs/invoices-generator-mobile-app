import { View, Text } from "react-native";

export function HeaderSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View className="flex-col ml-4 mt-4">
      <Text className="text-5xl font-bold text-[#1B512D]">{title}</Text>
      <Text className="text-md text-[#1B512D]/60">{description}</Text>
    </View>
  );
}
