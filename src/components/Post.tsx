// src/components/Post.tsx
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../type/user";
import { Post } from "../type/post";
import { getIfAlreadyLiked, likeAPost, unlikeAPost } from "../api/like.api";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { getPostComments } from "../api/comment.api";
import { UserComment } from "../type/comment";

interface PostProps {
  post: Post;
  user: User;
}

const PostComponent: React.FC<PostProps> = ({ user, post }: PostProps) => {
  const [likes, setLikes] = useState(post.likes.length);

  const { data: comments } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => getPostComments(post.id),
    select: (data) => data.comments as UserComment[],
  });

  const queryClient = useQueryClient();
  const getIfLiked = useQuery<boolean>({
    queryKey: ["like"],
    queryFn: () => getIfAlreadyLiked({ userId: user.id, postId: post.id }),
  });
  const [alreadyLiked, setAlreadyLiked] = useState(
    () => getIfLiked.data || false
  );

  const likeMutation = useMutation({
    mutationFn: likeAPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["like"] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: unlikeAPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["like"] });
    },
  });

  const likePost = () => {
    console.log("what is going on");
    likeMutation.mutate({ userId: user.id, postId: post.id });
    setLikes(likes + 1);
    setAlreadyLiked(!alreadyLiked);
  };

  const unlikePost = () => {
    unlikeMutation.mutate({ userId: user.id, postId: post.id });
    setLikes(likes - 1);
    setAlreadyLiked(!alreadyLiked);
  };

  const handleLikeButtonClicked = () => {
    alreadyLiked ? unlikePost() : likePost();
  };

  return (
    <div className="bg-white shadow p-4 rounded-lg mb-4">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="ml-3">
          <div className="font-bold">{post.user.username}</div>
          <div className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="mb-2">{post.content}</div>
      <div className="mb-2 flex justify-between">
        <span>{likes} Likes</span>
        <span>{post.comments.length} Comments</span>
      </div>
      <div className="flex space-x-4 text-gray-500">
        <button onClick={() => handleLikeButtonClicked()}>
          {alreadyLiked ? "Unlike" : "Like"}
        </button>
        <button>Comment</button>
      </div>
      <div>
        <AddComment postId={post.id} user={user} />
        <CommentList postComments={comments} postId={post.id} />
      </div>
    </div>
  );
};

export default PostComponent;
