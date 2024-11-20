import {
  UpdateUserRequest,
  UpdateUserResponse,
  UserLoginRequest,
  UserRegisterRequest,
} from "../type/user";
import apiClient from "../../../assets/config";

export const getUsersList = async (nrOfUsers?: number) => {
  const { data } = await apiClient.get("/user", {
    params: { nr: nrOfUsers },
  });
  return data;
};

export const getFilteredUsers = async ({ pageParam = null }) => {
  const { data } = await apiClient.post("/user/filtered", {
    params: { cursor: pageParam, limit: 10, search },
  });
  return data;
};

export const getUserData = async ({
  id,
  username,
}: {
  id?: number;
  username?: string;
}) => {
  const { data } = await apiClient.post("/user/data", { id, username });
  return data;
};

export const getUserPosts = async (id: string) => {
  const { data } = await apiClient.get(`/user/posts${id}`);
  return data;
};

export const registerUser = async (registerRequest: UserRegisterRequest) => {
  const { data } = await apiClient.post("/user/register", registerRequest);
  return data;
};

export const loginUser = async (loginRequest: UserLoginRequest) => {
  const { data } = await apiClient.post("/user/login", loginRequest);
  return data;
};

export const updateUser = async (
  id: string,
  userRequest: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const { data } = await apiClient.put(`/user/${id}`, userRequest);
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await apiClient.delete(`/user/${id}`);
  return data;
};
