import apiClient from '../../../assets/config';
import { ConnectionStateEnum } from '../models/connection-state.enum';
import {
  ConnectionStateResponse,
  UpdateUserRequest,
  User,
  UserConnection,
  UserLoginRequest,
  UserProfile,
  UserRegisterRequest,
} from '../models/user.models';
import { apiErrorHandler } from '@/core/utils/utils';

export const getUsersList = apiErrorHandler(async (nrOfUsers?: number) => {
  const { data } = await apiClient.get('/user', {
    params: { nr: nrOfUsers },
  });
  return data;
});

export const getFilteredUsers = async ({ pageParam = null }) => {
  const { data } = await apiClient.post('/user/filtered', {
    params: { cursor: pageParam, limit: 10, search },
  });
  return data;
};

export const getUserDetails = apiErrorHandler<UserProfile>(
  async ( username: string ) => {
    const { data } = await apiClient.post<UserProfile>('/user/details', { username });
    return data;
  }
);

export const getUserPosts = async (id: string) => {
  const { data } = await apiClient.get(`/user/posts${id}`);
  return data;
};

export const registerUser = apiErrorHandler(
  async (registerRequest: UserRegisterRequest) => {
    const { data } = await apiClient.post('/user/register', registerRequest);
    return data;
  }
);

export const loginUser = apiErrorHandler(
  async (loginRequest: UserLoginRequest) => {
    const { data } = await apiClient.post('/user/login', loginRequest);
    return data;
  }
);

export const updateUser = apiErrorHandler(
  async ({
    id,
    request,
  }: {
    id: string;
    request: UpdateUserRequest;
  }): Promise<User> => {
    const { data } = await apiClient.put(`/user/${id}`, request);
    return data;
  }
);

export const deleteUser = async (id: string) => {
  const { data } = await apiClient.delete(`/user/${id}`);
  return data;
};

export const getConnections = apiErrorHandler<UserConnection[]>(
  async ({id, searchString}: { id: number, searchString: string }) => {
    const { data } = await apiClient.post(`/user/connections/${id}`, { searchString });
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
  async ({ userId, connectionId }: { userId: number; connectionId: number }) => {
    const { data } = await apiClient.get(
      `/user/connection/${userId}/with/${connectionId}`
    );
    return data
  }
);

export const getSuggestions = apiErrorHandler<User[]>(
  async (id: number) => {
    const { data } = await apiClient.get(
      `/user/suggestions/${id}`
    );

    return data;
  }
);
