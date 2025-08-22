import { Text, View } from "react-native";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Unit price cannot be negative"),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      quantity: 1,
      unitPrice: 0,
    },
  });

  async function onSubmit(data: ProductFormValues) {
    console.log(data);
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
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <InputForm
                    type="numeric"
                    value={String(field.value)}
                    onChange={(value) => field.onChange(Number(value))}
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
                <FormLabel>Unit Price</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="0.00"
                    type="numeric"
                    value={String(field.value || "")}
                    onChange={(value) => field.onChange(Number(value))}
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
          <Text className="text-white">Add Product</Text>
        </Button>
      </View>
    </Form>
  );
}
