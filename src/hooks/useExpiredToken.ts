import jwt_decode from "jwt-decode";

interface DecodedToken {
  email: string;
  exp: number;
  iat: number;
  user_id: number;
}

interface UseExpiredTokenProps {
  token: string | null;
  refreshToken: string | null;
}

export default function useExpiredToken({
  token,
  refreshToken,
}: UseExpiredTokenProps) {
  // On récupère le temps d'expiration du token et du refreshToken
  let isExpiredRefreshToken = false;
  let isExpiredToken = false;

  if (token && refreshToken) {
    const expirationTimeToken = jwt_decode<DecodedToken>(token);
    isExpiredToken = Date.now() >= expirationTimeToken.exp * 1000;
    const expirationTimeRefreshToken = jwt_decode<DecodedToken>(refreshToken);
    isExpiredRefreshToken = Date.now() >= expirationTimeRefreshToken.exp * 1000;
  }

  return { isExpiredToken, isExpiredRefreshToken };
}
