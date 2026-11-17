import { NextResponse } from "next/server";
import type { ZodError } from "zod";

// Baca body JSON; kembalikan { ok: false } bila bukan JSON yang valid.
export async function readJsonBody(
  request: Request,
): Promise<{ ok: true; data: unknown } | { ok: false }> {
  try {
    return { ok: true, data: await request.json() };
  } catch {
    return { ok: false };
  }
}

export function invalidJsonResponse() {
  return NextResponse.json(
    { error: "Body harus berupa JSON yang valid" },
    { status: 400 },
  );
}

// 400 dengan rincian kesalahan per field (atau error umum bila tidak ada field).
export function validationErrorResponse(error: ZodError) {
  const { fieldErrors, formErrors } = error.flatten();
  return NextResponse.json(
    { error: Object.keys(fieldErrors).length > 0 ? fieldErrors : formErrors },
    { status: 400 },
  );
}
