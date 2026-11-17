"use client";

import { trpc } from "@/lib/trpc";

export default function TrpcProductList() {
  // Ketik "data." atau "p." di bawah: editor menampilkan autocomplete
  // id, name, description, price, category tanpa interface manual.
  const { data, isLoading, error } = trpc.getAll.useQuery();

  if (isLoading) return <p>Memuat...</p>;

  if (error) {
    return (
      <p role="alert" className="text-red-600">
        Gagal memuat produk: {error.message}
      </p>
    );
  }

  return (
    <ul className="list-disc space-y-1 pl-6">
      {data?.map((p) => (
        <li key={p.id}>
          {p.name} — Rp{p.price.toLocaleString("id-ID")}{" "}
          <span className="text-sm text-slate-500">({p.category})</span>
        </li>
      ))}
    </ul>
  );
}
