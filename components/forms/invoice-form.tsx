import { View, Text, Platform, Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import DateTimePicker from "@react-native-community/datetimepicker";
import { InputForm } from "../ui/input-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import axios from "axios";
import { Product } from "types/product";
import { API_URL } from "~/lib/config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "../ui/checkbox";
import { toast } from "../ui/toaster";
import { LoaderCircle } from "lucide-react-native";

const invoiceSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyEmail: z.email("Invalid email address"),
  companyAddress: z.string().min(1, "Company address is required"),
  companyCity: z.string().min(1, "Company city is required"),
  companyZipCode: z.string().min(1, "Company zip code is required"),
  companyCountry: z.string().min(1, "Company country is required"),
  companySiret: z
    .string()
    .length(14, "Company SIRET must be 14 digits")
    .regex(/^\d+$/, "Company SIRET must be a number"),
  companyPhoneNumber: z.string().min(1, "Company phone number is required"),
  companyVatNumber: z.string().optional(),
  companyVat: z.number().optional(),
  companyIban: z.string().optional(),
  companyBic: z.string().optional(),

  dateOfIssue: z.string().min(1, "Date of issue is required"),
  dueDate: z.string().min(1, "Due date is required"),
  products: z.array(z.number()).refine((value) => value.length > 0, {
    message: "Please select at least one product",
  }),
  vatResult: z.number().optional().nullable(),
  totalPriceWithoutVat: z.number().optional().nullable(),
  totalPriceWithVat: z.number().optional().nullable(),

  customerName: z.string().min(1, "Customer name is required"),
  customerSiret: z
    .union([
      z
        .string()
        .length(14, "SIRET must be 14 digits")
        .regex(/^\d+$/, "SIRET must be a number"),
      z.string().max(0),
    ])
    .optional(),
  customerAddress: z.string().min(1, "Customer address is required"),
  customerCity: z.string().min(1, "Customer city is required"),
  customerZipCode: z.string().min(1, "Customer zip code is required"),
  customerCountry: z.string().min(1, "Customer country is required"),

  paymentMethods: z.string().min(1, "Payment methods are required"),
});
export function InvoiceForm() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    },
  });
  const [showIssueDatePicker, setShowIssueDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      companyAddress: "",
      companyCity: "",
      companyZipCode: "",
      companyCountry: "",
      companySiret: "",
      companyPhoneNumber: "",
      companyVatNumber: "",
      companyVat: undefined,
      companyIban: "",
      companyBic: "",
      dateOfIssue: "",
      dueDate: "",
      products: [] as number[],
      vatResult: undefined,
      totalPriceWithoutVat: 0,
      totalPriceWithVat: undefined,
      customerName: "",
      customerSiret: "",
      customerAddress: "",
      customerCity: "",
      customerZipCode: "",
      customerCountry: "",
      paymentMethods: "",
    },
  });

  async function onSubmit(data: z.infer<typeof invoiceSchema>) {
    try {
      setIsLoading(true);
      // Calculer le prix total sans TVA
      let totalWithoutVat = 0;
      const productsData = data.products.map((productId) => {
        const product = products?.find((p) => p.id === productId);
        if (!product) throw new Error(`Product with ID ${productId} not found`);

        const productTotal = product.quantity * product.unitPrice;
        totalWithoutVat += productTotal;

        return {
          name: product.name,
          quantity: product.quantity,
          unitPrice: product.unitPrice,
        };
      });

      // Calculer la TVA et le prix total avec TVA si applicable
      const vatRate = data.companyVat || 0;
      const vatResult = (totalWithoutVat * vatRate) / 100;
      const totalWithVat = totalWithoutVat + vatResult;

      // Nettoyer les chaînes vides et mettre à jour les totaux
      const cleanData = {
        ...data,
        companyVat: vatRate,
        companyVatNumber: data.companyVatNumber || undefined,
        customerSiret: data.customerSiret || undefined,
        products: productsData,
        totalPriceWithoutVat: totalWithoutVat,
        totalPriceWithVat: vatRate > 0 ? totalWithVat : undefined,
        vatResult: vatRate > 0 ? vatResult : undefined,
      };

      // Supprimer les propriétés undefined
      const invoiceData = Object.fromEntries(
        Object.entries(cleanData).filter(([_, v]) => v !== undefined)
      );

      await axios.post(`${API_URL}/invoices`, invoiceData);
      toast.success(`Invoice generated successfully.`);
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      form.reset();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(
        error.response?.data?.message || "Failed to generate invoice"
      );
      throw new Error("Failed to generate invoice");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <View className="flex-col gap-4 px-4 ">
        <View>
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

        <View>
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

        <View>
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

        <View>
          <FormField
            control={form.control}
            name="companyCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company City</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="City"
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

        <View>
          <FormField
            control={form.control}
            name="companyZipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Zip Code</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="Zip Code"
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

        <View>
          <FormField
            control={form.control}
            name="companyCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Country</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="Country"
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

        <View>
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

        <View>
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

        <View>
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

        <View>
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

        <View>
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

        <View>
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

        <View>
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

        <View>
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

        <FormField
          control={form.control}
          name="products"
          render={() => (
            <FormItem>
              <FormLabel>Products</FormLabel>
              <FormControl>
                <View>
                  {products?.map((product) => (
                    <FormField
                      key={product.id}
                      control={form.control}
                      name="products"
                      render={({ field }) => {
                        const isChecked = field.value?.includes(product.id);
                        return (
                          <FormItem
                            key={product.id}
                            className="flex flex-row items-center bg-white mb-2 pl-1"
                          >
                            <View className="w-1 h-12 bg-[#1B512D] mr-3" />
                            <FormControl>
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  Haptics.impactAsync(
                                    Haptics.ImpactFeedbackStyle.Light
                                  );
                                  if (checked) {
                                    field.onChange([
                                      ...(field.value || []),
                                      product.id,
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value?.filter(
                                        (value) => value !== product.id
                                      )
                                    );
                                  }
                                }}
                                className="w-5 h-5 mr-3"
                              />
                            </FormControl>
                            <View className="flex-1">
                              <Text className="text-base">{product.name}</Text>
                              <Text className="text-gray-600 text-sm">
                                Total price :{" "}
                                {(product.unitPrice * product.quantity).toFixed(
                                  2
                                )}
                                $
                              </Text>
                            </View>
                            <View className="flex flex-row items-center gap-2">
                              <Text className="text-sm">Quantity : </Text>
                              <InputForm
                                placeholder="Quantity"
                                type="numeric"
                                value={String(product.quantity)}
                                onChange={async (text) => {
                                  try {
                                    await axios.patch(
                                      `${API_URL}/products/${product.id}/quantity`,
                                      { quantity: Number(text) }
                                    );

                                    // Mettre à jour la valeur dans le formulaire
                                    field.value = field.value.map((p: any) =>
                                      p.id === product.id
                                        ? { ...p, quantity: Number(text) }
                                        : p
                                    );
                                    queryClient.invalidateQueries({
                                      queryKey: ["products"],
                                    });
                                  } catch (error) {
                                    console.error(
                                      "Error updating quantity:",
                                      error
                                    );
                                    // Vous pouvez ajouter ici une notification d'erreur si vous le souhaitez
                                  }
                                }}
                              />
                            </View>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </View>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <View>
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

        <View>
          <FormField
            control={form.control}
            name="customerSiret"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer SIRET (If it's a company)</FormLabel>
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

        <View>
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

        <View>
          <FormField
            control={form.control}
            name="customerCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer City</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="City"
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

        <View>
          <FormField
            control={form.control}
            name="customerZipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Zip Code</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="Zip Code"
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

        <View>
          <FormField
            control={form.control}
            name="customerCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Country</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="Country"
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

        <View>
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
          className={`${
            isLoading ? "bg-[#1B512D]/50" : "bg-[#1B512D]"
          } rounded-md p-2`}
          onPress={async (e) => {
            console.log("Button clicked");
            console.log("Form state:", form.getValues());
            console.log("Form errors:", form.formState.errors);

            await form.handleSubmit(async (data) => {
              console.log("Form handleSubmit called");
              await onSubmit(data);
            })(e);
          }}
        >
          <View className="flex-row items-center justify-center">
            {isLoading ? (
              <View className="animate-spin">
                <LoaderCircle size={20} color="#fff" />
              </View>
            ) : (
              <Text className="text-white font-medium">Generate</Text>
            )}
          </View>
        </Button>
      </View>
    </Form>
  );
}
