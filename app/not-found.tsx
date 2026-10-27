import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6 text-center">
      <h1 className="mt-10 text-4xl font-bold">404</h1>
      <p className="mt-3 text-lg">Halaman atau produk tidak ditemukan.</p>
      <Link href="/produk" className="mt-6 inline-block text-blue-700 underline">
        Kembali ke katalog
      </Link>
    </main>
  );
}
