import { Product } from "~/types/product";

export const defaultValuesEditForm = (product: Product) => {
  return {
    name: product.name,
    quantity: product.quantity.toString(),
    unitPrice: product.unitPrice.toString(),
  };
};
