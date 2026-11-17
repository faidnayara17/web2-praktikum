import { NextResponse } from "next/server";
import { addTask, getTasks } from "@/lib/tasks";
import { taskSchema } from "@/lib/task-schema";
import {
  invalidJsonResponse,
  readJsonBody,
  validationErrorResponse,
} from "@/lib/api-utils";

export const dynamic = "force-dynamic";

// GET /api/tugas -> 200 + daftar tugas (urut deadline)
export async function GET() {
  return NextResponse.json(await getTasks());
}

// POST /api/tugas -> 201 + tugas baru | 400 bila JSON/validasi gagal
export async function POST(request: Request) {
  const body = await readJsonBody(request);
  if (!body.ok) return invalidJsonResponse();

  const parsed = taskSchema.safeParse(body.data);
  if (!parsed.success) return validationErrorResponse(parsed.error);

  const task = await addTask(parsed.data);
  return NextResponse.json(task, { status: 201 });
}
