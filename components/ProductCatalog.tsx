<<<<<<< HEAD
﻿"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

=======
"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

// Data diterima lewat props dari Server Component (halaman),
// karena product-store.ts hanya boleh dipakai di server.
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
export default function ProductCatalog({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = [
    "Semua",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts = products.filter((product) => {
    const keyword = search.trim().toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword);

    const matchesCategory =
      selectedCategory === "Semua" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="katalog" className="py-10">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
          Produk pilihan
        </p>
<<<<<<< HEAD

        <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Katalog Produk
        </h2>

=======
        <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Katalog Produk
        </h2>
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
        <p className="mt-2 text-slate-600">
          Temukan produk unggulan dari usaha lokal.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Cari produk
          </label>
<<<<<<< HEAD

=======
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
          <input
            id="search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Masukkan nama produk..."
<<<<<<< HEAD
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
=======
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Filter kategori
          </label>
<<<<<<< HEAD

=======
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
          <select
            id="category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
<<<<<<< HEAD
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
=======
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-4 text-sm text-slate-600" aria-live="polite">
<<<<<<< HEAD
        Menampilkan {filteredProducts.length} produk
=======
        Menampilkan {filteredProducts.length} dari {products.length} produk
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
      </p>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <h3 className="font-semibold text-slate-900">Produk tidak ditemukan</h3>
<<<<<<< HEAD

=======
>>>>>>> b17e8dcd5fefad888ae81c5203323952f8df2a67
          <p className="mt-2 text-sm text-slate-600">
            Coba kata kunci atau kategori yang berbeda.
          </p>
        </div>
      )}
    </section>
  );
}
