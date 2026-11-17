import { z } from "zod";

export const TASK_STATUSES = ["belum", "proses", "selesai"] as const;
export const taskStatusSchema = z.enum(TASK_STATUSES, {
  errorMap: () => ({ message: "Status harus belum, proses, atau selesai." }),
});
export type TaskStatus = z.infer<typeof taskStatusSchema>;

const judul = z
  .string({ required_error: "Judul wajib diisi." })
  .trim()
  .min(3, "Judul minimal 3 karakter.")
  .max(150, "Judul maksimal 150 karakter.");

// Format YYYY-MM-DD (sesuai <input type="date">), dan harus tanggal yang nyata
// (menolak mis. 2026-02-31).
const deadline = z
  .string({ required_error: "Deadline wajib diisi." })
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Format deadline harus YYYY-MM-DD.")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, "Tanggal deadline tidak valid.");

// Untuk create (POST): status opsional, default "belum"
export const taskSchema = z.object({
  judul,
  deadline,
  status: taskStatusSchema.default("belum"),
});
export type TaskInput = z.infer<typeof taskSchema>;

// Untuk update (PATCH): semua field opsional, minimal satu harus diisi.
// Sengaja TANPA default, supaya PATCH tidak me-reset status secara tidak sengaja.
export const taskUpdateSchema = z
  .object({
    judul: judul.optional(),
    deadline: deadline.optional(),
    status: taskStatusSchema.optional(),
  })
  .refine(
    (data) => Object.values(data).some((value) => value !== undefined),
    { message: "Minimal satu field (judul, deadline, status) harus diubah." },
  );
export type TaskUpdate = z.infer<typeof taskUpdateSchema>;

// Bentuk data yang dikirim API ke client
export type Task = TaskInput & { id: string; dibuatPada: string };
