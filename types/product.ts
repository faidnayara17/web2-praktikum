export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

export type ProductInput = Omit<Product, "id">;

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ProductPreview = Pick<Product, "id" | "name">;

export type ProductDraft = Partial<Product>;

export type ProductUpdate = Omit<Product, "id">;

export type ProductMap = Record<string, Product>;
