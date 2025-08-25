import axios from "axios";
import { API_URL } from "../../config";
import { QueryClient } from "@tanstack/react-query";
import { ProductFormValues } from "~/components/forms/product-form";
import { toast } from "~/components/ui/toaster";

export const addProduct = async (
  data: ProductFormValues,
  queryClient: QueryClient
) => {
  try {
    await axios.post(`${API_URL}/products`, data);
    toast.success("Product added successfully");
    queryClient.invalidateQueries({ queryKey: ["products"] });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Error adding product");
    } else {
      toast.error("Error adding product");
    }
  }
};
