import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { productRouter } from "@/server/routers/product";

// Procedure memakai Prisma -> wajib runtime Node.js, tanpa cache.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: productRouter,
    createContext: () => ({}),
  });

// GET untuk query, POST untuk mutation
export { handler as GET, handler as POST };
