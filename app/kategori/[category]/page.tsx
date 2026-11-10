<<<<<<< HEAD
﻿import Link from "next/link";
=======
import Link from "next/link";
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/product-store";

<<<<<<< HEAD
export const runtime = "nodejs";

=======
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
export const dynamic = "force-dynamic";

export default async function KategoriPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: encodedCategory } = await params;
<<<<<<< HEAD

  const category = decodeURIComponent(encodedCategory);

  const products = await getProducts();

=======
  const category = decodeURIComponent(encodedCategory);

  const products = await getProducts();
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
  const filteredProducts = products.filter(
    (product) =>
      product.category.toLocaleLowerCase("id-ID") ===
      category.toLocaleLowerCase("id-ID")
  );

  if (filteredProducts.length === 0) {
    notFound();
  }

  return (
<<<<<<< HEAD
    <main className="mx-auto max-w-6xl p-6">
=======
    <main className="mx-auto w-full max-w-6xl p-6">
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
      <Link href="/produk" className="text-blue-700 underline">
        Kembali ke katalog
      </Link>

      <h1 className="my-5 text-3xl font-bold">Kategori: {category}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
