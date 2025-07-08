import apiClient from '@/assets/config';
import { apiErrorHandler } from '@/core/utils/utils';
import { NotificationsResponse, Notification } from '@/core/models/notification.models';

export const getAllNotifications = apiErrorHandler<NotificationsResponse>(async (params?: {
  page?: number;
  limit?: number;
}) => {
  const { data } = await apiClient.get('/notifications', { params });
  return data;
});

export const getUnreadNotifications = apiErrorHandler<Notification[]>(async () => {
  const { data } = await apiClient.get('/notifications/unread');
  return data;
});

export const getNotificationsCount = apiErrorHandler<{ count: number }>(async () => {
  const { data } = await apiClient.get('/notifications/count');
  return data;
})

export const markNotificationAsRead = apiErrorHandler<Notification>(async (notificationId: number) => {
  const { data } = await apiClient.patch(`/notifications/${notificationId}/read`);
  return data;
});

export const markAllNotificationsAsRead = apiErrorHandler<{ success: boolean }>(async () => {
  const { data } = await apiClient.patch('/notifications/read-all');
  return data;
});

export const deleteNotification = apiErrorHandler<{ success: boolean }>(async (notificationId: number) => {
  const { data } = await apiClient.delete(`/notifications/${notificationId}`);
  return data;
}); 