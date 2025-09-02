import { View, Text, Platform, Pressable } from "react-native";
import * as Haptics from "expo-haptics";
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
import { Product } from "types/product";
import { API_URL } from "~/lib/config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "../ui/checkbox";
import { toast } from "../ui/toaster";

const invoiceSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyEmail: z.email("Invalid email address"),
  companyAddress: z.string().min(1, "Company address is required"),
  companySiret: z.string().min(1, "Company SIRET is required"),
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
  customerAddress: z.string().min(1, "Customer address is required"),
  customerEmail: z
    .union([z.email("Invalid email address"), z.string().max(0)])
    .optional(),
  customerVatNumber: z.string().optional(),
  customerPurchaseOrder: z.string().optional(),

  paymentMethods: z.string().min(1, "Payment methods are required"),
});
export function InvoiceForm() {
  console.log("InvoiceForm component mounted");
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
      customerAddress: "",
      customerEmail: "",
      customerVatNumber: "",
      customerPurchaseOrder: "",
      paymentMethods: "",
    },
  });

  async function onSubmit(data: z.infer<typeof invoiceSchema>) {
    try {
      console.log("Form submission started");
      console.log("All form data:", data);
      // Transformer les IDs en objets produits complets
      const productsData = data.products.map((productId) => {
        const product = products?.find((p) => p.id === productId);
        if (!product) throw new Error(`Product with ID ${productId} not found`);
        return {
          name: product.name,
          quantity: product.quantity,
          unitPrice: product.unitPrice.toString(), // Assurez-vous que c'est une chaîne
        };
      });

      const invoiceData = {
        ...data,
        companyVat: data.companyVat || 0, // Si undefined, mettre 0
        customerVatNumber: data.customerVatNumber || undefined, // Enlever la chaîne vide
        products: productsData,
      };

      console.log("Sending data to backend:", invoiceData);
      const response = await axios.post(`${API_URL}/invoices`, invoiceData);

      console.log("Response received:", response);
      console.log("PDF generated:", response.data);
      toast.success(
        `Invoice generated successfully. File: ${response.data.filePath}`
      );
    } catch (error) {
      console.error(error);
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

        <View>
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

        <View>
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
          className="bg-[#1B512D] rounded-md p-2"
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
          <Text className="text-white">Generate</Text>
        </Button>
      </View>
    </Form>
  );
}
