import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/product-store";

export const dynamic = "force-dynamic";

export default async function DetailProdukPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <Link href="/produk" className="text-blue-700 underline">
        Kembali ke katalog
      </Link>

      <article className="mt-5 rounded-lg border border-slate-200 bg-white p-6 text-slate-900">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="my-4">{product.description}</p>
        <p>
          <strong>Kategori:</strong>{" "}
          <Link
            href={`/kategori/${encodeURIComponent(product.category)}`}
            className="text-blue-700 underline"
          >
            {product.category}
          </Link>
        </p>
        <p className="mt-2 text-xl font-semibold">
          {product.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}
        </p>
      </article>
    </main>
  );
}
