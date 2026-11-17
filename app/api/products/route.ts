import { NextResponse } from "next/server";
import { createProduct, getProducts } from "@/lib/product-store";
import { productSchema } from "@/lib/product-schema";

// product-store memakai Prisma, jadi harus berjalan di runtime Node.js
// dan tidak boleh di-cache (data produk bisa berubah kapan saja).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/products -> 200 + array produk
export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Gagal mengambil produk:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data produk." },
      { status: 500 },
    );
  }
}

// POST /api/products
// 1) terima data -> 2) validasi -> 3) bentuk objek -> 4) simpan
export async function POST(request: Request) {
  // 1) Terima data: body harus JSON yang valid
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Body harus berupa JSON yang valid" },
      { status: 400 },
    );
  }

  // 2) Validasi dengan skema Zod yang sama dengan form & tRPC
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors, formErrors } = parsed.error.flatten();
    return NextResponse.json(
      { error: Object.keys(fieldErrors).length > 0 ? fieldErrors : formErrors },
      { status: 400 },
    );
  }

  // 3-4) Bentuk & simpan dari parsed.data (bukan body mentah),
  //      sehingga properti tambahan di luar skema diabaikan.
  try {
    const newProduct = await createProduct(parsed.data);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Gagal menyimpan produk:", error);
    return NextResponse.json(
      { error: "Produk gagal disimpan. Periksa koneksi database." },
      { status: 500 },
    );
  }
}
