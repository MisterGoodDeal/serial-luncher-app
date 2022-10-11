export interface NotificationToken {
  token: string;
  platform: string;
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
