import { initTRPC } from "@trpc/server";

// Inisialisasi tRPC satu kali; dipakai oleh semua router.
const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure; // procedure tanpa autentikasi
