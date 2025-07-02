export interface Notification {
  id: number;
  userId: number;
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
  
  // Comment related
  COMMENT_REPORTED = 'COMMENT_REPORTED',
  COMMENT_ARCHIVED = 'COMMENT_ARCHIVED',
  COMMENT_APPROVED = 'COMMENT_APPROVED',
  
  NEW_FOLLOWER = 'NEW_FOLLOWER',
  MENTIONED_IN_COMMENT = 'MENTIONED_IN_COMMENT',
  MENTIONED_IN_POST = 'MENTIONED_IN_POST',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
  ACCOUNT_WARNING = 'ACCOUNT_WARNING'
} 