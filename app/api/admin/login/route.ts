import { NextResponse } from "next/server";
import {
  adminSessionCookie,
  createAdminSessionToken,
  isAdminConfigurationValid,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminConfigurationValid()) {
    return NextResponse.json(
      { error: "Konfigurasi admin belum lengkap. Periksa variabel ADMIN_*." },
      { status: 503 }
    );
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json(
      { error: "Format permintaan tidak valid." },
      { status: 415 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Format permintaan tidak valid." },
      { status: 400 }
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("username" in body) ||
    !("password" in body) ||
    typeof body.username !== "string" ||
    typeof body.password !== "string"
  ) {
    return NextResponse.json(
      { error: "Username dan password wajib diisi." },
      { status: 400 }
    );
  }

  if (!verifyAdminCredentials(body.username, body.password)) {
    return NextResponse.json(
      { error: "Username atau password salah." },
      { status: 401 }
    );
  }

  const token = createAdminSessionToken();
  if (!token) {
    return NextResponse.json(
      { error: "Konfigurasi admin belum lengkap." },
      { status: 503 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(adminSessionCookie.name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: adminSessionCookie.maxAge,
  });

  return response;
}
