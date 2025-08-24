import { Text, View } from "react-native";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { InputForm } from "~/components/ui/input-form";
import { Button } from "~/components/ui/button";
import { QueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  unitPrice: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Unit price cannot be negative"
    ),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm({
  defaultValues,
  submitForm,
  id,
  ctaText,
}: {
  defaultValues: ProductFormValues;
  submitForm: (
    data: ProductFormValues,
    queryClient: QueryClient,
    form: UseFormReturn<ProductFormValues>,
    id?: number
  ) => void;
  id?: number;
  ctaText: string;
}) {
  const queryClient = useQueryClient();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(data: ProductFormValues) {
    if (id) {
      submitForm(data, queryClient, form, id);
    } else {
      submitForm(data, queryClient, form);
    }
  }

  return (
    <Form {...form}>
      <View className="flex-col gap-4 px-4">
        <View>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="Product name"
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
            name="unitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Price (Examples : 500, 5000.99)</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="0.00"
                    type="numeric"
                    value={String(field.value)}
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
          onPress={form.handleSubmit(onSubmit)}
        >
          <Text className="text-white">{ctaText}</Text>
        </Button>
      </View>
    </Form>
  );
}
