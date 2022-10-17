import { User } from "./enrollment";
import { Place } from "./places";

export interface NotificationToken {
  token: string;
  platform: string;
  lang: string;
}

export interface FirebaseNotification {
  messageId: string;
  data: {
    title: string;
    body: string;
    extra?: string;
  };
  notification: {
    title: string;
    body: string;
    sound: string;
  };
  from: string;
}
