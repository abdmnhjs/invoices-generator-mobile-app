import { View, Text, Platform, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { InputForm } from "../ui/input-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import axios from "axios";
import { invoiceSchema } from "../../lib/schemas/invoice-schema";

const FormScheam = invoiceSchema;

export function InvoiceForm() {
  const [showIssueDatePicker, setShowIssueDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);

  const form = useForm<z.infer<typeof FormScheam>>({
    resolver: zodResolver(FormScheam),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      companyAddress: "",
      companySiret: "",
      companyPhoneNumber: undefined,
      companyVatNumber: "",
      companyVat: undefined,
      companyIban: "",
      companyBic: "",
      dateOfIssue: "",
      dueDate: "",
      products: [],
      vatResult: undefined,
      totalPriceWithoutVat: 0,
      totalPriceWithVat: undefined,
      customerName: "",
      customerAddress: "",
      customerEmail: "",
      customerSiren: "",
      customerVatNumber: "",
      customerPurchaseOrder: "",
      customerDeliveryAddress: "",
      paymentMethods: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormScheam>) {
    try {
      const formattedData = {
        ...data,
        products: [], // Sera géré plus tard avec une dialog
        totalPriceWithoutVat: 0, // À calculer plus tard en fonction des produits
        totalPriceWithVat: 0, // À calculer plus tard en fonction des produits et de la TVA
      };
      await axios.post("http://localhost:3000/invoices", formattedData);
    } catch (error) {
      console.error(error);
    }
  }

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
            name="companyEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Email</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="company@email.com"
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
            name="companyAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Address</FormLabel>
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
            name="companySiret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company SIRET</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="12345678901234"
                    type="numeric"
                    value={String(field.value || "")}
                    onChange={field.onChange}
                    maxLength={14}
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
            name="companyPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Phone Number</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="+33123456789"
                    type="phone-pad"
                    value={String(field.value || "")}
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
            name="companyVatNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company VAT Number (If you have one)</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="VAT Number"
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
            name="companyVat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Company VAT Rate (%) (If you have a VAT number)
                </FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="20"
                    type="numeric"
                    value={String(field.value || "")}
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
            name="companyIban"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company IBAN (Optional)</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="FR76 1234 5678 9012 3456 7890 12"
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
            name="companyBic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company BIC (Optional)</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="BNPAFRPP"
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
            name="dateOfIssue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of issue</FormLabel>
                <FormControl>
                  <Pressable onPress={() => setShowIssueDatePicker(true)}>
                    <InputForm
                      placeholder="Select date"
                      type="default"
                      value={field.value}
                      {...{ editable: false }}
                      className="bg-[#1B512D]/10 text-black cursor-pointer"
                    />
                  </Pressable>
                  {showIssueDatePicker && (
                    <DateTimePicker
                      value={field.value ? new Date(field.value) : new Date()}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, date) => {
                        setShowIssueDatePicker(false);
                        if (date) {
                          field.onChange(date.toISOString().split("T")[0]);
                        }
                      }}
                    />
                  )}
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
                  <Pressable onPress={() => setShowDueDatePicker(true)}>
                    <InputForm
                      placeholder="Select date"
                      type="default"
                      value={field.value}
                      {...{ editable: false }}
                      className="bg-[#1B512D]/10 text-black cursor-pointer"
                    />
                  </Pressable>
                  {showDueDatePicker && (
                    <DateTimePicker
                      value={field.value ? new Date(field.value) : new Date()}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, date) => {
                        setShowDueDatePicker(false);
                        if (date) {
                          field.onChange(date.toISOString().split("T")[0]);
                        }
                      }}
                    />
                  )}
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

        <View className="mt-5">
          <FormField
            control={form.control}
            name="customerAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Address</FormLabel>
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
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Customer Email (Optional, make sure to have the right to send
                  the email)
                </FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="customer@email.com"
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
            name="customerSiren"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer SIREN</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="123456789"
                    type="numeric"
                    value={String(field.value || "")}
                    onChange={field.onChange}
                    maxLength={9}
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
            name="customerVatNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer VAT Number (If he has one)</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="VAT Number"
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
            name="customerPurchaseOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Purchase Order (Optional)</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="PO-12345"
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
            name="customerDeliveryAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Delivery Address (Optional)</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="Delivery Address"
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
            name="paymentMethods"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Methods</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="Bank Transfer, Credit Card, etc."
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
          onPress={form.handleSubmit(onSubmit)}
        >
          <Text className="text-white">Generate</Text>
        </Button>
      </View>
    </Form>
  );
}
