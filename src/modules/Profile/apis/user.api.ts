import apiClient from '../../../assets/config';
import {
  Connection,
  ConnectionRequest,
  ConnectionStateResponse,
  LoggedUser,
  ResetPasswordRequest,
  Settings,
  SettingsRequest,
  Suggestion,
  UpdateUserRequest,
  User,
  UserConnection,
  UserLoginRequest,
  UserProfile,
  UserRegisterRequest,
} from '../models/user.models';
import { apiErrorHandler } from '@/core/utils/utils';

export const getUserDetails = apiErrorHandler<UserProfile>(
  async (username: string) => {
    const { data } = await apiClient.post<UserProfile>('/user/details', {
      username,
    });
    return data;
  }
);

export const registerUser = apiErrorHandler<{ token: string; userProfile: LoggedUser }>(
  async (registerRequest: UserRegisterRequest) => {
    const { data } = await apiClient.post('/user/register', registerRequest);
    return data;
  }
);

export const loginUser = apiErrorHandler<{ token: string; userProfile: LoggedUser }>(
  async (loginRequest: UserLoginRequest) => {
    const { data } = await apiClient.post('/user/login', loginRequest);
    return data;
  }
);

export const requestPasswordReset = apiErrorHandler(
  async ({ email }: { email: string }) => {
    const { data } = await apiClient.post('/user/password/reset/request', {
      email,
    });
    return data;
  }
);

export const resetPassword = apiErrorHandler(
  async (request: ResetPasswordRequest) => {
    const { data } = await apiClient.put(
      `/user/password/reset/${request.userId}`,
      request
    );
    return data;
  }
);

export const resetTokenVerify = apiErrorHandler<{ userId: number }>(
  async ({ token }: { token: string }) => {
    const { data } = await apiClient.get(
      `/user/password/reset/token/verify/${token}`
    );
    return data;
  },
  { errorToaster: false }
);

export const updateUser = apiErrorHandler<User>(
  async ({ id, request }: { id: number; request: UpdateUserRequest }) => {
    const { data } = await apiClient.put(`/user/${id}`, request);
    return data;
  }
);

export const deleteUser = apiErrorHandler<{ success: boolean }>(
  async (id: number) => {
    const { data } = await apiClient.delete(`/user/${id}`);
    return data;
  }
);

export const getConnections = apiErrorHandler<UserConnection[]>(
  async ({ id, searchString }: { id: number; searchString: string }) => {
    const { data } = await apiClient.post(`/user/connections/${id}`, {
      searchString,
    });
    return data;
  }
);

export const getConnectionRequests = apiErrorHandler<ConnectionRequest[]>(
  async (id: number) => {
    const { data } = await apiClient.get(`/user/connections/requests/${id}`);
    return data;
  }
);

export const getSuggestions = apiErrorHandler<Suggestion[]>(
  async ({ id, searchString }: { id: number; searchString?: string }) => {
    const { data } = await apiClient.post(`/user/suggestions/${id}`, {
      searchString,
    });

    return data;
  }
);

export const requestConnection = apiErrorHandler<void>(
  async ({ id, connectionId }: { id: string; connectionId: string }) => {
    const { data } = await apiClient.post(
      `/user/connection/${id}/request/${connectionId}`
    );
    return data;
  }
);

export const acceptConnection = apiErrorHandler<void>(
  async ({ id, connectionId }: { id: string; connectionId: string }) => {
    const { data } = await apiClient.put(
      `/user/connection/${id}/accept/${connectionId}`
    );
    return data;
  }
);

export const removeConnection = apiErrorHandler<void>(
  async ({ id, connectionId }: { id: string; connectionId: string }) => {
    const { data } = await apiClient.delete(
      `/user/connection/${id}/disconnect/${connectionId}`
    );
    return data;
  }
);

export const getConnectionState = apiErrorHandler<ConnectionStateResponse>(
  async ({
    userId,
    connectionId,
  }: {
    userId: number;
    connectionId: number;
  }) => {
    const { data } = await apiClient.get(
      `/user/connection/${userId}/with/${connectionId}`
    );
    return data;
  }
);

export const getAllConnections = apiErrorHandler<Connection[]>(async () => {
  const { data } = await apiClient.get('/user/connections/all');
  return data;
});

export const getSettings = apiErrorHandler<Settings>(
  async (userId: number) => {
    const { data } = await apiClient.get(`/user/settings/${userId}`);
    return data;
  }
);

export const updateSettings = apiErrorHandler<Settings>(
  async ({
    userId,
    settingsRequest,
  }: {
    userId: number;
    settingsRequest: SettingsRequest;
  }) => {
    const { data } = await apiClient.put(
      `/user/settings/${userId}`,
      settingsRequest
    );
    return data;
  }
);
