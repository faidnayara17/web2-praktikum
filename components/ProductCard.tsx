import Link from "next/link";
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
        </Link>
      </div>
    </article>
  );
}
