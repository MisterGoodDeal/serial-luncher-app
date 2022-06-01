export type InfoType =
  | "logout"
  | "delete"
  | "error"
  | "valid"
  | "heart"
  | "deposit";

export interface Info {
  visible: boolean;
  title: string | null;
  content: string | null;
  type: InfoType | null;
  buttons: {
    valid: {
      text: string;
      action: (() => void) | null | string;
    } | null;
    cancel: {
      text: string | null;
      action: (() => void) | null | string;
    } | null;
  } | null;
}

export type Application = {
  info: Info;
  pending: boolean;
};
