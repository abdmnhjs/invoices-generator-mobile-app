import { productSchema } from "~/lib/schemas/product-schema";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Text, View } from "react-native";
import { InputForm } from "~/components/ui/input-form";

const FormSchema = productSchema;

export function ProductForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      unitPrice: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <View className="flex-col space-y-8 px-4 ">
        <View className="mt-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="Example"
                    type="default"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
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
                    value={String(field.value)}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </View>
        <View className="mt-5">
          <FormField
            control={form.control}
            name="unitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit Price</FormLabel>
                <FormControl>
                  <InputForm
                    placeholder="100.00"
                    type="numeric"
                    value={String(field.value)}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </View>
        <Button
          className="bg-[#1B512D] rounded-md p-2 mt-5"
          onPress={form.handleSubmit(onSubmit)}
        >
          <Text className="text-white">Add</Text>
        </Button>
      </View>
    </Form>
  );
}
