export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  data?: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  pages: number;
  total: number;
}

export enum NotificationType {
  POST_REPORTED = 'POST_REPORTED',
  POST_ARCHIVED = 'POST_ARCHIVED',
  POST_APPROVED = 'POST_APPROVED',
  POST_LIKED = 'POST_LIKED',
  POST_COMMENTED = 'POST_COMMENTED',
  COMMENT_REPORTED = 'COMMENT_REPORTED',
  COMMENT_ARCHIVED = 'COMMENT_ARCHIVED',
  COMMENT_APPROVED = 'COMMENT_APPROVED',
  NEW_FOLLOWER = 'NEW_FOLLOWER',
  MENTIONED = 'MENTIONED',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
  ACCOUNT_WARNING = 'ACCOUNT_WARNING'
}

export enum NotificationIcons {
  POST_LIKED = '❤️',
  POST_COMMENTED = '💬',
  POST_REPORTED = '⚠️',
  POST_ARCHIVED = '📁',
  POST_APPROVED = '✅',
  COMMENT_REPORTED = '⚠️',
  COMMENT_ARCHIVED = '📁',
  COMMENT_APPROVED = '✅',
  NEW_FOLLOWER = '👥',
  MENTIONED_IN_COMMENT = '@',
  MENTIONED_IN_POST = '@',
  SYSTEM_ANNOUNCEMENT = '📢',
  ACCOUNT_WARNING = '🚨',
  DEFAULT = '📌',
}

export enum NotificationColors {
  POST_REPORTED = 'destructive',
  COMMENT_REPORTED = 'destructive',
  ACCOUNT_WARNING = 'destructive',
  POST_APPROVED = 'default',
  COMMENT_APPROVED = 'default',
  NEW_FOLLOWER = 'default',
  SYSTEM_ANNOUNCEMENT = 'secondary',
  DEFAULT = 'outline',
}
