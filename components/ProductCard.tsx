<<<<<<< HEAD
﻿import Link from "next/link";
=======
import Link from "next/link";
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
<<<<<<< HEAD
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div
        aria-hidden="true"
        className="flex h-28 items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 text-4xl font-bold text-blue-700/70"
      >
        {product.name.charAt(0)}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {product.category}
        </span>

        <h2 className="text-lg font-semibold leading-snug text-slate-900">
          {product.name}
        </h2>

        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
          {product.description}
        </p>

        <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
          <span className="text-xs uppercase tracking-wide text-slate-400">
            Harga
          </span>
          <span className="text-xl font-bold text-blue-700">
            {formattedPrice}
          </span>
        </div>

        <Link
          href={`/produk/${product.id}`}
          className="mt-4 inline-block text-sm font-semibold text-blue-700 underline"
        >
          Lihat detail
=======
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 text-slate-900 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link
        href={`/kategori/${encodeURIComponent(product.category)}`}
        className="mb-3 w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
      >
        {product.category}
      </Link>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
        {product.description}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-lg font-bold text-blue-700">{formattedPrice}</p>
        <Link
          href={`/produk/${product.id}`}
          className="text-sm font-medium text-slate-500 hover:text-blue-700"
        >
          Lihat detail →
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
        </Link>
      </div>
    </article>
  );
}
