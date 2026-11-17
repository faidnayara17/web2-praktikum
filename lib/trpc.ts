import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/routers/product";

// import type -> hanya tipe yang dibawa ke client, kode server (Prisma) tidak ikut.
export const trpc = createTRPCReact<AppRouter>();
