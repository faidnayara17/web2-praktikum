import { Suspense } from "react";
import { getProductById } from "@/lib/products";
import ProductSkeleton from "@/components/ProductSkeleton";

async function ProductDetail({ id }: { id: string }) {
  const product = await getProductById(id);
  if (!product) return <p>Produk tidak ditemukan.</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>Rp{product.price.toLocaleString("id-ID")}</p>
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="p-8 text-gray-900">
      <p className="text-sm text-gray-500 mb-4">
        Header halaman muncul instan — detail menyusul.
      </p>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetail id={id} />
      </Suspense>
    </main>
  );
}