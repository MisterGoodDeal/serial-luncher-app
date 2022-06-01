export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  token: string | null;
  refreshToken: string | null;
}
