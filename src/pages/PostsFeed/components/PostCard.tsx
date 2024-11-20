// src/components/Post.tsx
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Post } from "../models/post.models";
import { getIfAlreadyLiked, likeAPost, unlikeAPost } from "../apis/like.api";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { getPostComments } from "../apis/comment.api";
import { UserComment } from "../models/comment.models";
import { User } from "@/pages/ProfilePage/models/user.models";
import { AvatarComponent } from "@/components/Avatar";
import { getInitials } from "@/utils/utils";

interface PostProps {
  post: Post;
  user: User;
}

const PostCard: React.FC<PostProps> = ({ user, post }: PostProps) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);

  const initials = getInitials(user.username);

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
        <AvatarComponent initials={initials}></AvatarComponent>
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
        <button onClick={() => setShowComments(!showComments)}>
          {post.comments.length} Comments
        </button>
      </div>
      <div className="flex space-x-4 text-gray-500">
        <button onClick={() => handleLikeButtonClicked()}>
          {alreadyLiked ? "Unlike" : "Like"}
        </button>
      </div>
      <div>
        <AddComment postId={post.id} user={user} />
        {showComments ? (
          <CommentList postComments={comments} postId={post.id} />
        ) : null}
      </div>
    </div>
  );
};

export default PostCard;
