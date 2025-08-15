import { View, Text } from "react-native";

export function HeaderTab({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View className="flex-col mt-10 ml-4">
      <Text className="text-5xl font-bold text-[#1B512D]">{title}</Text>
      <Text className="text-md text-[#1B512D]/60">{description}</Text>
    </View>
  );
}
