import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Product } from "@/types/product";

// Tipe Product didefinisikan di types/product.ts (satu-satunya definisi),
// lalu diekspor ulang agar kontrak modul tetap terpenuhi.
export type { Product, ProductInput } from "@/types/product";

const dataFile = path.join(process.cwd(), "data", "products.json");

async function readProducts(): Promise<Product[]> {
  const content = await readFile(dataFile, "utf8");
  return JSON.parse(content) as Product[];
}

export async function getProducts(): Promise<Product[]> {
  return readProducts();
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await readProducts();
  return products.find((product) => product.id === id) ?? null;
}
