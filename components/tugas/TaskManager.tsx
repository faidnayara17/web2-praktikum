"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { TASK_STATUSES } from "@/lib/task-schema";
import type { Task, TaskStatus } from "@/lib/task-schema";

const STATUS_LABEL: Record<TaskStatus, string> = {
  belum: "Belum dikerjakan",
  proses: "Sedang dikerjakan",
  selesai: "Selesai",
};

type FieldErrors = Record<string, string[] | undefined>;

async function fetchTasks(): Promise<Task[]> {
  const response = await fetch("/api/tugas", { cache: "no-store" });
  if (!response.ok) throw new Error(`Server membalas ${response.status}`);
  return response.json();
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Muat daftar tugas sekali saat halaman dibuka
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchTasks();
        if (!cancelled) setTasks(data);
      } catch (error) {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : "Gagal memuat.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget; // simpan sebelum await
    const formData = new FormData(form);

    setSubmitting(true);
    setMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/tugas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul: formData.get("judul"),
          deadline: formData.get("deadline"),
          status: formData.get("status"),
        }),
      });
      const result = await response.json();

      if (response.status === 201) {
        form.reset();
        setMessage("Tugas berhasil ditambahkan.");
        setTasks(await fetchTasks());
      } else if (response.status === 400) {
        if (result.error && !Array.isArray(result.error) && typeof result.error === "object") {
          setFieldErrors(result.error as FieldErrors);
        } else {
          setMessage(String(result.error ?? "Data tidak valid."));
        }
      } else {
        setMessage("Terjadi kesalahan pada server.");
      }
    } catch {
      setMessage("Tidak dapat menghubungi server.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusChange(id: string, status: TaskStatus) {
    const response = await fetch(`/api/tugas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (response.ok) setTasks(await fetchTasks());
    else setMessage("Status gagal diubah.");
  }

  async function handleDelete(id: string) {
    const response = await fetch(`/api/tugas/${id}`, { method: "DELETE" });
    if (response.ok) setTasks(await fetchTasks());
    else setMessage("Tugas gagal dihapus.");
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleCreate}
        className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 text-slate-900"
      >
        <h2 className="text-lg font-semibold">Tambah Tugas</h2>

        <div>
          <label htmlFor="judul" className="block text-sm font-medium text-slate-700">
            Judul
          </label>
          <input id="judul" name="judul" className="w-full rounded border p-2" />
          <p className="text-sm text-red-600">{fieldErrors.judul?.[0]}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-slate-700">
              Deadline
            </label>
            <input id="deadline" name="deadline" type="date" className="w-full rounded border p-2" />
            <p className="text-sm text-red-600">{fieldErrors.deadline?.[0]}</p>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-700">
              Status
            </label>
            <select id="status" name="status" defaultValue="belum" className="w-full rounded border p-2">
              {TASK_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABEL[status]}
                </option>
              ))}
            </select>
            <p className="text-sm text-red-600">{fieldErrors.status?.[0]}</p>
          </div>
        </div>

        <p role="status" aria-live="polite" className="text-sm text-slate-700">
          {message}
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {submitting ? "Menyimpan..." : "Simpan Tugas"}
        </button>
      </form>

      <section aria-labelledby="daftar-tugas">
        <h2 id="daftar-tugas" className="mb-3 text-lg font-semibold">
          Daftar Tugas
        </h2>

        {loading ? (
          <p>Memuat...</p>
        ) : loadError ? (
          <p role="alert" className="text-red-600">
            Gagal memuat tugas: {loadError}
          </p>
        ) : tasks.length === 0 ? (
          <p>Belum ada tugas.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 text-slate-900"
              >
                <div>
                  <p className={task.status === "selesai" ? "font-semibold line-through" : "font-semibold"}>
                    {task.judul}
                  </p>
                  <p className="text-sm text-slate-600">
                    Deadline:{" "}
                    {new Date(`${task.deadline}T00:00:00`).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor={`status-${task.id}`} className="sr-only">
                    Ubah status {task.judul}
                  </label>
                  <select
                    id={`status-${task.id}`}
                    value={task.status}
                    onChange={(event) =>
                      handleStatusChange(task.id, event.target.value as TaskStatus)
                    }
                    className="rounded border p-1 text-sm"
                  >
                    {TASK_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {STATUS_LABEL[status]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleDelete(task.id)}
                    className="rounded border border-red-300 px-3 py-1 text-sm font-semibold text-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
