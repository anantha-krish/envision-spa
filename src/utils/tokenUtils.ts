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
  if (!token) return true;
  const decoded = decodeJwt(token);
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}

export function getExpiryTimeFromToken(token: string): number | null {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    if (!decoded.exp) return null;
    return decoded.exp * 1000; // convert to milliseconds
  } catch (error) {
    console.error("Invalid JWT token:", error);
    return null;
  }
}
