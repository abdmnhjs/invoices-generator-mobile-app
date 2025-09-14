import { View, Text } from "react-native";
import { Invoice } from "~/types/invoices/invoice";
import { Separator } from "../ui/separator";

export function ActivityLogs({ invoices }: { invoices: Invoice[] }) {
  return (
    <View>
      {invoices.map((invoice, index) => (
        <View key={invoice.id}>
          <View className="flex-row items-center justify-between gap-2">
            <Text>{invoice.customerName}</Text>
            <Text>Invoice #{invoice.id}</Text>
            <Text>
              +{Number(invoice.totalPriceWithoutVat).toLocaleString("en-US")}$
            </Text>
          </View>
          {index !== invoices.length - 1 && <Separator className="my-2" />}
        </View>
      ))}
    </View>
  );
}
