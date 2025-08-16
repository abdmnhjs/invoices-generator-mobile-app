import { View, Text } from "react-native";
import { InputForm } from "./input-form";
import { Button } from "../ui/button";

export function InvoiceForm() {
  return (
    <View className="flex-col gap-4 pb-10">
      <InputForm
        label="Company name"
        placeholder="Your Company"
        type="default"
      />
      <InputForm
        label="Email"
        placeholder="your@email.com"
        type="email-address"
      />
      <InputForm
        label="Address"
        placeholder="Street, City, State, Zip"
        type="default"
      />
      <InputForm label="SIRET" placeholder="SIRET Number" type="numeric" />
      <InputForm label="TVA" placeholder="TVA Rate" type="numeric" />
      <InputForm
        label="Date of issue"
        placeholder="dd/mm/yyyy"
        type="numeric"
        isDate
      />
      <InputForm
        label="Due date"
        placeholder="dd/mm/yyyy"
        type="numeric"
        isDate
      />
      <InputForm label="Product name" placeholder="My product" type="default" />
      <InputForm label="Quantity" placeholder="1" type="numeric" />
      <InputForm label="Price per unit" placeholder="100€" type="numeric" />
      <InputForm label="Customer name" placeholder="John Doe" type="default" />
      <Button className="bg-[#1B512D] rounded-md p-2">
        <Text className="text-white">Generate</Text>
      </Button>
    </View>
  );
}
