import TaskManager from "@/components/tugas/TaskManager";

export default function TugasPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Tugas Kuliah</h1>
        <p className="mt-1 text-slate-600">
          Tugas Mandiri Modul 6: REST API + validasi Zod. Data tersimpan di
          memori server (hilang saat server di-restart).
        </p>
      </div>
      <TaskManager />
    </main>
  );
}
