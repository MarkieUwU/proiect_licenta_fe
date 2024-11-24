import apiClient from "../../../assets/config";

export const getIfAlreadyLiked = async (postId: number, userId: number) => {
  const { data } = await apiClient.get(`/like/${userId}`, {
    params: { postId },
  });
  return data;
};

export const likeAPost = async (userId: number, postId: number) => {
  const { data } = await apiClient.post("/like", { userId, postId });
  return data;
};

export const unlikeAPost = async (userId: number, postId: number) => {
  const { data } = await apiClient.delete("/like", {
    params: { userId, postId },
  });
  return data;
};
