export type UserComment = {
  id: string;
  text: string;
  updatedAt: string;
  author: string;
  isEdited?: boolean;
  postId: string;
  userId: string;
};

export type CommentRequest = {
  text: string;
  userId: string;
};
