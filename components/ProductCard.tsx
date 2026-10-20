import Link from "next/link";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-xl border bg-white p-4 text-gray-900 shadow">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p>Rp{product.price.toLocaleString("id-ID")}</p>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-sm">{product.inStock ? "Tersedia" : "Stok habis"}</p>
      <Link href={`/products/${product.id}`} className="text-sm text-blue-600 underline">
        Lihat detail
      </Link>
      <div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}