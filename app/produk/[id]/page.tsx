<<<<<<< HEAD
﻿import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/product-store";

export const runtime = "nodejs";

=======
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/product-store";

>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
export const dynamic = "force-dynamic";

export default async function DetailProdukPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
<<<<<<< HEAD

=======
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
<<<<<<< HEAD
    <main className="mx-auto max-w-3xl p-6">
=======
    <main className="mx-auto w-full max-w-3xl p-6">
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
      <Link href="/produk" className="text-blue-700 underline">
        Kembali ke katalog
      </Link>

<<<<<<< HEAD
      <article className="mt-5 rounded-lg border p-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="my-4">{product.description}</p>

        <p>
          <strong>Kategori:</strong> {product.category}
        </p>

=======
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
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
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
