<<<<<<< HEAD
﻿import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Product } from "@/types/product";

export type { Product } from "@/types/product";

export type ProductInput = {
  name: string;
  description: string;
  price: number;
  category: string;
};

function toProduct(product: {
  id: string;
  name: string;
  description: string;
  price: Prisma.Decimal;
  category: { name: string };
}): Product {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price.toNumber(),
    category: product.category.name,
  };
}

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return products.map(toProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  return product ? toProduct(product) : null;
}

export async function createProduct(data: ProductInput): Promise<Product> {
  const categoryName = data.category.trim();

  const category = await prisma.category.upsert({
    where: { name: categoryName },
    update: {},
    create: { name: categoryName },
  });

  const product = await prisma.product.create({
    data: {
      name: data.name.trim(),
      description: data.description.trim(),
      price: new Prisma.Decimal(data.price),
      categoryId: category.id,
    },
    include: { category: true },
  });

  return toProduct(product);
}

export async function updateProduct(
  id: string,
  data: ProductInput,
): Promise<Product | null> {
  const existing = await prisma.product.findUnique({ where: { id } });

  if (!existing) {
    return null;
  }

  const categoryName = data.category.trim();

  const category = await prisma.category.upsert({
    where: { name: categoryName },
    update: {},
    create: { name: categoryName },
  });

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: data.name.trim(),
      description: data.description.trim(),
      price: new Prisma.Decimal(data.price),
      categoryId: category.id,
    },
    include: { category: true },
  });

  return toProduct(product);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const result = await prisma.product.deleteMany({ where: { id } });

  return result.count > 0;
=======
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
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
}
