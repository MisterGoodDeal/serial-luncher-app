export interface LoginError {
  title: "missing_parameters" | "wrong_password" | "unknown_user";
  message: "credential_mismatch";
}

export interface RegisterError {
  data: "email_already_in_database";
}

export interface LoginResponse {
  id: number;
  prenom: string;
  nom: string;
  mail: string;
}
