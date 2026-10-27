export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ProductPreview = Pick<Product, "id" | "name">;

export type ProductDraft = Partial<Product>;

export type ProductUpdate = Omit<Product, "id">;

export type ProductMap = Record<number, Product>;
