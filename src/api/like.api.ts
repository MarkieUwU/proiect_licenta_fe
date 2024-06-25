import apiClient from "../assets/config";

export const getIfAlreadyLiked = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  const { data } = await apiClient.get(`/like/${userId}`, {
    params: { postId },
  });
  return data;
};

export const likeAPost = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  const { data } = await apiClient.post("/like", { userId, postId });
  return data;
};

export const unlikeAPost = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  const { data } = await apiClient.delete("/like", {
    params: { userId, postId },
  });
  return data;
};
