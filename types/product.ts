<<<<<<< HEAD
﻿export type Product = {
=======
export type Product = {
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};
<<<<<<< HEAD
=======

export type ProductInput = Omit<Product, "id">;

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ProductPreview = Pick<Product, "id" | "name">;

export type ProductDraft = Partial<Product>;

export type ProductUpdate = Omit<Product, "id">;

export type ProductMap = Record<string, Product>;
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
