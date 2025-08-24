import axios from "axios";
import { API_URL } from "../../config";
import { QueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "~/components/forms/product-form";

export const addProduct = async (
  data: ProductFormValues,
  queryClient: QueryClient,
  form: UseFormReturn<ProductFormValues>
) => {
  try {
    console.log("Submitting product data:", data);
    const response = await axios.post(`${API_URL}/products`, data);
    console.log("Product created:", response.data);
    queryClient.invalidateQueries({ queryKey: ["products"] });
    form.reset();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data);
    } else {
      console.error("Error:", error);
    }
  }
};
