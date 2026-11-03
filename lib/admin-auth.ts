import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "pusaka_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

type AdminConfiguration = {
  username: string;
  password: string;
  secret: string;
};

type AdminSession = {
  expiresAt: number;
};

function getAdminConfiguration(): AdminConfiguration | null {
  const { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_SECRET } = process.env;

  if (
    !ADMIN_USERNAME ||
    !ADMIN_PASSWORD ||
    !ADMIN_SESSION_SECRET ||
    ADMIN_SESSION_SECRET.length < 32
  ) {
    return null;
  }

  return {
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
    secret: ADMIN_SESSION_SECRET,
  };
}

function constantTimeEqual(left: string, right: string): boolean {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function isAdminConfigurationValid(): boolean {
  return getAdminConfiguration() !== null;
}

export function verifyAdminCredentials(
  username: string,
  password: string
): boolean {
  const configuration = getAdminConfiguration();
  if (!configuration) return false;

  const usernameMatches = constantTimeEqual(username, configuration.username);
  const passwordMatches = constantTimeEqual(password, configuration.password);
  return usernameMatches && passwordMatches;
}

export function createAdminSessionToken(): string | null {
  const configuration = getAdminConfiguration();
  if (!configuration) return null;

  const session: AdminSession = {
    expiresAt: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");

  return `${payload}.${sign(payload, configuration.secret)}`;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const configuration = getAdminConfiguration();
  if (!configuration) return false;

  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) return false;

  const expectedSignature = sign(payload, configuration.secret);
  if (!constantTimeEqual(signature, expectedSignature)) return false;

  try {
    const session: unknown = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );
    if (
      typeof session !== "object" ||
      session === null ||
      !("expiresAt" in session) ||
      typeof session.expiresAt !== "number"
    ) {
      return false;
    }

    return session.expiresAt > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export const adminSessionCookie = {
  name: SESSION_COOKIE,
  maxAge: SESSION_DURATION_SECONDS,
};
