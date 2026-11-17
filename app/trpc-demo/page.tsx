import TrpcProductList from "@/components/TrpcProductList";

export default function TrpcDemoPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-4 p-8">
      <h1 className="text-2xl font-bold">Produk (tRPC)</h1>
      <TrpcProductList />
    </main>
  );
}
