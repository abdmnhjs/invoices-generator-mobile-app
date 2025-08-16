import { View, Text } from "react-native";
import { InputForm } from "./input-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

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
    <Form {...form}>
      <View className="flex-col space-y-8 px-4 ">
        <View className="mt-5">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="Your Company"
                    type="default"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        <View className="mt-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="your@email.com"
                    type="email-address"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        <View className="mt-5">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="Street, City, State, Zip"
                    type="default"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        <View className="mt-5">
          <FormField
            control={form.control}
            name="siret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SIRET</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="SIRET Number"
                    type="numeric"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        <View className="mt-5">
          <FormField
            control={form.control}
            name="tva"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TVA (%)</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="20"
                    type="numeric"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        <View className="mt-5">
          <FormField
            control={form.control}
            name="dateOfIssue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of issue</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="dd/mm/yyyy"
                    type="numeric"
                    isDate
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        <View className="mt-5">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due date</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="dd/mm/yyyy"
                    type="numeric"
                    isDate
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        <View className="mt-5">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="My product"
                    type="default"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        <View className="mt-5">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="1"
                    type="numeric"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        <View className="mt-5">
          <FormField
            control={form.control}
            name="pricePerUnit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per unit (€)</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="100"
                    type="numeric"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        <View className="mt-5">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer name</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="John Doe"
                    type="default"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
        <Button
          className="bg-[#1B512D] rounded-md p-2 mt-5"
          onPress={form.handleSubmit((data) => {
            console.log(data);
          })}
        >
          <Text className="text-white">Generate</Text>
        </Button>
      </View>
    </Form>
  );
}
