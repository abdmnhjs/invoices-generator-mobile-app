import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "~/components/forms/product-form";
import { API_URL } from "~/lib/config";

export const editProduct = async (
  data: ProductFormValues,
  queryClient: QueryClient,
  form: UseFormReturn<ProductFormValues>,
  id?: number
) => {
  try {
    if (!id) {
      throw new Error("Product ID is required for editing");
    }

    await axios.put(`${API_URL}/products/${id}`, {
      name: data.name,
      unitPrice: data.unitPrice,
    });

    // Invalider le cache pour forcer un rafraîchissement des données
    await queryClient.invalidateQueries({ queryKey: ["products"] });

    form.reset();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      form.setError("root", {
        type: "server",
        message:
          error.response?.data?.message ||
          "Une erreur est survenue lors de la modification du produit",
      });
    } else {
      form.setError("root", {
        type: "server",
        message: "Une erreur est survenue lors de la modification du produit",
      });
    }
    throw error;
  }
};
