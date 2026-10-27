import Link from "next/link";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/produk", label: "Produk" },
  { href: "/about", label: "Tentang" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-xl font-bold text-blue-700">
          UMKM Digital Store
        </Link>
        <nav aria-label="Navigasi utama" className="flex gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
