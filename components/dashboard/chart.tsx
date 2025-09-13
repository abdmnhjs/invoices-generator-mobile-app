import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export const Chart = ({
  data,
}: {
  data: { value: number; label: string }[];
}) => {
  return (
    <View>
      <Text className="text-lg text-[#1B512D]/60 text-center">
        The last 6 months
      </Text>
      <LineChart
        areaChart
        data={data}
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
        formatYLabel={(value) => `${Number(value).toLocaleString("en-US")}$`}
        maxValue={Math.max(...data.map((item) => item.value))}
        stepValue={Math.ceil(Math.max(...data.map((item) => item.value)) / 4)}
        yAxisThickness={0}
        horizontalRulesStyle={{
          width: 0.3,
          color: "#66666620",
          type: "solid",
        }}
      />
    </View>
  );
};
