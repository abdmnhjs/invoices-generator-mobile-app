import type { Invoice } from "types/invoice";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { View } from "react-native";
import { Text } from "../ui/text";
import { Eye, Share2, Trash } from "lucide-react-native";
import axios from "axios";
import { API_URL } from "~/lib/config";
import { useQueryClient } from "@tanstack/react-query";
import { shareInvoice } from "~/lib/invoices/share";

export const InvoiceCard = (invoice: Invoice) => {
  const queryClient = useQueryClient();
  return (
    <Card className="w-full flex-col" key={invoice.id.toString()}>
      <CardHeader className="flex-row">
        <View className="flex-col gap-2">
          <CardTitle className="text-lg font-semibold text-[#1B512D]">
            Invoice #{invoice.id}
          </CardTitle>
        </View>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="outline"
          className="flex-row items-center gap-2 w-full"
        >
          <Eye color="#1B512D" />
          <Text className="font-semibold text-[#1B512D]">Preview</Text>
        </Button>
        <Button
          variant="outline"
          className="flex-row items-center gap-2 w-full"
          onPress={async () => {
            try {
              if (!invoice.pdfUrl) {
                alert("URL du PDF non disponible");
                return;
              }
              console.log("URL du PDF:", invoice.pdfUrl);
              await shareInvoice(invoice.pdfUrl, `invoice-${invoice.id}.pdf`);
            } catch (error) {
              console.error("Erreur lors du partage:", error);
              alert("Erreur lors du partage du PDF");
            }
          }}
        >
          <Share2 color="#1B512D" />
          <Text className="font-semibold text-[#1B512D]">Share</Text>
        </Button>
        <Button
          variant="destructive"
          className="flex-row items-center gap-2 w-full"
          onPress={async () => {
            try {
              await axios.delete(`${API_URL}/invoices/${invoice.id}`);
              queryClient.invalidateQueries({ queryKey: ["invoices"] });
              console.log("Invoice deleted successfully");
            } catch (error) {
              if (axios.isAxiosError(error)) {
                console.error("API Error:", error.response?.data);
              } else {
                console.error("Error:", error);
              }
            }
          }}
        >
          <Trash color="#FFF" />
          <Text className="font-semibold">Delete</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};
