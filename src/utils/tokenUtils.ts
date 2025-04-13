import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  role: string;
  iat: number;
  user_id: number;
}

/**
 * Decodes a JWT token.
 * @param token JWT string.
 * @returns Decoded payload or null if invalid.
 */
export function decodeJwt(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
}

/**
 * Checks if the JWT is expired.
 * @param token JWT string.
 * @returns true if expired, false otherwise.
 */
export function isJwtExpired(token: string): boolean {
  const decoded = decodeJwt(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}
