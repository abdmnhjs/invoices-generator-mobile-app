import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ProductFormValues } from "~/components/forms/product-form";
import { API_URL } from "~/lib/config";
import { toast } from "~/components/ui/toaster";

export const editProduct = async (
  data: ProductFormValues,
  queryClient: QueryClient,
  id?: number
) => {
  try {
    if (!id) {
      throw new Error("Product ID is required for editing");
    }

    const productData = {
      name: data.name,
      quantity: data.quantity,
      unitPrice: data.unitPrice.toString(),
    };
    console.log("Sending data to server:", productData);
    await axios.put(`${API_URL}/products/${id}`, productData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success("Product updated successfully");

    await queryClient.invalidateQueries({ queryKey: ["products"] });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
      toast.error(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la modification du produit"
      );
    } else {
      toast.error("Une erreur est survenue lors de la modification du produit");
    }
    throw error;
  }
};
