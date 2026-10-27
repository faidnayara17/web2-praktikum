import type { Product } from "@/types/product";
import { products } from "@/data/products";

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simulasi lambat
  const allProducts = await getProducts();
  return allProducts.find((p) => String(p.id) === id) ?? null;
}
