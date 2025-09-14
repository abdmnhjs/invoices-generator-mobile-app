import { View, Text } from "react-native";
import { Invoice } from "~/types/invoices/invoice";
import { Separator } from "../ui/separator";
import { Clock } from "lucide-react-native";

export function ActivityLogs({ invoices }: { invoices: Invoice[] }) {
  return (
    <View className="border border-gray-200 rounded-lg p-4 shadow-xs mb-4">
      {invoices.map((invoice, index) => (
        <View key={invoice.id}>
          <View className="flex-row items-center justify-between gap-2">
            <View className="flex-col gap-2">
              <Text className="font-bold">{invoice.customerName}</Text>
              <Text className="text-gray-500">Invoice #{invoice.id}</Text>
              <View className="flex-row items-center gap-2">
                <Clock color="#6B7280" width={14} height={14} />
                <Text className="text-gray-500 text-sm">
                  {new Date(invoice.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(invoice.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            </View>
            <Text className="font-bold text-[#1B512D]">
              +{Number(invoice.totalPriceWithoutVat).toLocaleString("en-US")}$
            </Text>
          </View>
          {index !== invoices.length - 1 && <Separator className="my-2" />}
        </View>
      ))}
    </View>
  );
}
