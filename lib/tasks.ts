import type { Task, TaskInput, TaskUpdate } from "@/lib/task-schema";

// Penyimpanan in-memory, pola yang sama dengan contoh di modul.
// Disimpan di globalThis agar tidak ter-reset saat hot reload (mode dev) dan
// dipakai bersama oleh semua route handler. Data hilang saat server restart.
// Semua fungsi async supaya mudah diganti Prisma (model Task) nanti.
const store = globalThis as unknown as { tasks?: Task[] };

store.tasks ??= [
  {
    id: "t1",
    judul: "Laporan praktikum Modul 6 (REST, GraphQL, tRPC)",
    deadline: "2026-11-24",
    status: "proses",
    dibuatPada: "2026-11-10T00:00:00.000Z",
  },
  {
    id: "t2",
    judul: "Latihan soal TypeScript generics",
    deadline: "2026-11-20",
    status: "belum",
    dibuatPada: "2026-11-10T00:00:00.000Z",
  },
  {
    id: "t3",
    judul: "Kuis Server Actions",
    deadline: "2026-11-12",
    status: "selesai",
    dibuatPada: "2026-11-10T00:00:00.000Z",
  },
];

export async function getTasks(): Promise<Task[]> {
  // urut berdasarkan deadline terdekat
  return [...store.tasks!].sort((a, b) => a.deadline.localeCompare(b.deadline));
}

export async function getTaskById(id: string): Promise<Task | null> {
  return store.tasks!.find((task) => task.id === id) ?? null;
}

export async function addTask(input: TaskInput): Promise<Task> {
  const task: Task = {
    id: crypto.randomUUID(),
    judul: input.judul,
    deadline: input.deadline,
    status: input.status,
    dibuatPada: new Date().toISOString(),
  };
  store.tasks = [...store.tasks!, task];
  return task;
}

export async function updateTask(
  id: string,
  patch: TaskUpdate,
): Promise<Task | null> {
  const existing = store.tasks!.find((task) => task.id === id);
  if (!existing) return null;

  const updated: Task = { ...existing };
  if (patch.judul !== undefined) updated.judul = patch.judul;
  if (patch.deadline !== undefined) updated.deadline = patch.deadline;
  if (patch.status !== undefined) updated.status = patch.status;

  store.tasks = store.tasks!.map((task) => (task.id === id ? updated : task));
  return updated;
}

export async function deleteTask(id: string): Promise<boolean> {
  const before = store.tasks!.length;
  store.tasks = store.tasks!.filter((task) => task.id !== id);
  return store.tasks.length < before;
}
