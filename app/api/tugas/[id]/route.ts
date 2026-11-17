import { NextResponse } from "next/server";
import { deleteTask, getTaskById, updateTask } from "@/lib/tasks";
import { taskUpdateSchema } from "@/lib/task-schema";
import {
  invalidJsonResponse,
  readJsonBody,
  validationErrorResponse,
} from "@/lib/api-utils";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

const notFound = () =>
  NextResponse.json({ error: "Tugas tidak ditemukan." }, { status: 404 });

// GET /api/tugas/:id -> 200 | 404
export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  const task = await getTaskById(id);
  return task ? NextResponse.json(task) : notFound();
}

// PATCH /api/tugas/:id -> 200 | 400 | 404 (ubah sebagian field)
export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params;

  const body = await readJsonBody(request);
  if (!body.ok) return invalidJsonResponse();

  const parsed = taskUpdateSchema.safeParse(body.data);
  if (!parsed.success) return validationErrorResponse(parsed.error);

  const task = await updateTask(id, parsed.data);
  return task ? NextResponse.json(task) : notFound();
}

// DELETE /api/tugas/:id -> 204 | 404
export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;
  const deleted = await deleteTask(id);
  return deleted ? new NextResponse(null, { status: 204 }) : notFound();
}
