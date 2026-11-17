import { z } from "zod";
import { publicProcedure, router } from "@/server/trpc";
import {
  createProduct,
  getProductById,
  getProducts,
} from "@/lib/product-store";
import { productSchema } from "@/lib/product-schema";

export const productRouter = router({
  // query: baca semua produk
  getAll: publicProcedure.query(() => getProducts()),

  // query: baca satu produk, null jika tidak ditemukan
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => (await getProductById(input.id)) ?? null),

  // mutation: tambah produk; input divalidasi productSchema
  // (skema yang SAMA dengan REST, jadi aturan ditulis satu kali saja)
  addProduct: publicProcedure
    .input(productSchema)
    .mutation(({ input }) => createProduct(input)),
});

// Tipe diturunkan langsung dari definisi procedure di server.
export type AppRouter = typeof productRouter;
