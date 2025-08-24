import { Product } from "~/types/product";

export const defaultValuesEditForm = (product: Product) => {
  return {
    name: product.name,
    unitPrice: product.unitPrice,
  };
};
