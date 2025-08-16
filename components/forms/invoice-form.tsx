import { View, Text } from "react-native";
import { InputForm } from "./input-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormScheam = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(255, "Company name must be less than 255 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(500, "Address must be less than 500 characters"),
  siret: z
    .string()
    .min(14, "SIRET must be 14 characters")
    .max(14, "SIRET must be 14 characters"),
  tva: z
    .string()
    .min(1, "TVA is required")
    .max(10, "TVA must be less than 10 characters"),
  dateOfIssue: z
    .string()
    .min(10, "Date must be in format dd/mm/yyyy")
    .max(10, "Date must be in format dd/mm/yyyy"),
  dueDate: z
    .string()
    .min(10, "Date must be in format dd/mm/yyyy")
    .max(10, "Date must be in format dd/mm/yyyy"),
  productName: z
    .string()
    .min(1, "Product name is required")
    .max(255, "Product name must be less than 255 characters"),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .max(10, "Quantity must be less than 10 characters"),
  pricePerUnit: z
    .string()
    .min(1, "Price per unit is required")
    .max(10, "Price must be less than 10 characters"),
  customerName: z
    .string()
    .min(1, "Customer name is required")
    .max(255, "Customer name must be less than 255 characters"),
});

export function InvoiceForm() {
  const form = useForm<z.infer<typeof FormScheam>>({
    resolver: zodResolver(FormScheam),
    defaultValues: {
      companyName: "",
      email: "",
      address: "",
      siret: "",
      tva: "",
      dateOfIssue: "",
      dueDate: "",
      productName: "",
      quantity: "",
      pricePerUnit: "",
      customerName: "",
    },
  });

  return (
    <View className="flex-col gap-4 pb-10">
      <InputForm
        label="Company name"
        placeholder="Your Company"
        type="default"
        error={form.formState.errors.companyName?.message}
        onChange={(value) => form.setValue("companyName", value)}
      />
      <InputForm
        label="Email"
        placeholder="your@email.com"
        type="email-address"
        error={form.formState.errors.email?.message}
        onChange={(value) => form.setValue("email", value)}
      />
      <InputForm
        label="Address"
        placeholder="Street, City, State, Zip"
        type="default"
        error={form.formState.errors.address?.message}
        onChange={(value) => form.setValue("address", value)}
      />
      <InputForm
        label="SIRET"
        placeholder="SIRET Number"
        type="numeric"
        error={form.formState.errors.siret?.message}
        onChange={(value) => form.setValue("siret", value)}
      />
      <InputForm
        label="TVA (%) "
        placeholder="20"
        type="numeric"
        error={form.formState.errors.tva?.message}
        onChange={(value) => form.setValue("tva", value)}
      />
      <InputForm
        label="Date of issue"
        placeholder="dd/mm/yyyy"
        type="numeric"
        isDate
        error={form.formState.errors.dateOfIssue?.message}
        onChange={(value) => form.setValue("dateOfIssue", value)}
      />
      <InputForm
        label="Due date"
        placeholder="dd/mm/yyyy"
        type="numeric"
        isDate
        error={form.formState.errors.dueDate?.message}
        onChange={(value) => form.setValue("dueDate", value)}
      />
      <InputForm
        label="Product name"
        placeholder="My product"
        type="default"
        error={form.formState.errors.productName?.message}
        onChange={(value) => form.setValue("productName", value)}
      />
      <InputForm
        label="Quantity"
        placeholder="1"
        type="numeric"
        error={form.formState.errors.quantity?.message}
        onChange={(value) => form.setValue("quantity", value)}
      />
      <InputForm
        label="Price per unit (€)"
        placeholder="100"
        type="numeric"
        error={form.formState.errors.pricePerUnit?.message}
        onChange={(value) => form.setValue("pricePerUnit", value)}
      />
      <InputForm
        label="Customer name"
        placeholder="John Doe"
        type="default"
        error={form.formState.errors.customerName?.message}
        onChange={(value) => form.setValue("customerName", value)}
      />
      <Button
        className="bg-[#1B512D] rounded-md p-2"
        onPress={form.handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Text className="text-white">Generate</Text>
      </Button>
    </View>
  );
}
