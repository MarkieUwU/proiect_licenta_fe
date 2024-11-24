// src/components/Post.tsx
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Post } from '../models/post.models';
import { getIfAlreadyLiked, likeAPost, unlikeAPost } from '../apis/like.api';
import AddComment from './AddComment';
import CommentList from './CommentList';
import { getPostComments } from '../apis/comment.api';
import { UserComment } from '../models/comment.models';
import { User } from '@/pages/ProfilePage/models/user.models';
import { AvatarComponent } from '@/components/Avatar';
import { getInitials } from '@/utils/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ThumbsUp } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { toast } from 'sonner';

interface PostProps {
  post: Post;
  user: User;
}

const PostCard: React.FC<PostProps> = ({ user, post }: PostProps) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [showComments, setShowComments] = useState(false);
  const initials = getInitials(post.user.username);
  const queryClient = useQueryClient();

  const { data: comments } = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => getPostComments(post.id),
    select: (data) => data.comments as UserComment[],
  });
  const ownComment = comments?.filter((comment) => comment.userId === user.id);

  const getIfLiked = useQuery<boolean>({
    queryKey: ['like', post.id],
    queryFn: () => getIfAlreadyLiked(post.id, user.id),
    initialData: false,
  });
  const [alreadyLiked, setAlreadyLiked] = useState(() => getIfLiked.data);

  const likeMutation = useMutation({
    mutationFn: ({ userId, postId }: { userId: number; postId: number }) =>
      likeAPost(userId, postId),
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like'] });
    },
    onError: (err) => {
      setLikes(likes - 1);
      setAlreadyLiked(false);
      toast.error(err.message);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: ({ userId, postId }: { userId: number; postId: number }) =>
      unlikeAPost(userId, postId),
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['like'] });
    },
    onError: (err) => {
      setLikes(likes + 1);
      setAlreadyLiked(true);
      toast.error(err.message);
    },
  });

  const likePost = () => {
    likeMutation.mutate({ userId: user.id, postId: post.id });
    setLikes(likes + 1);
  };

  const unlikePost = () => {
    unlikeMutation.mutate({ userId: user.id, postId: post.id });
    setLikes(likes - 1);
  };

  const handleLikeButtonClicked = () => {
    alreadyLiked ? unlikePost() : likePost();
    setAlreadyLiked(!alreadyLiked);
  };

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>
          <div className="flex items-center gap-3 mb-2">
            <AvatarComponent initials={initials}></AvatarComponent>
            <div className="flex flex-col">
              <span className="text-lg">{post.user.username}</span>
              <span className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-4 pt-0">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg">
              <strong>{post.title}</strong>
            </h2>
            <p>{post.content}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <Toggle
              variant="outline"
              className="rounded-full"
              pressed={alreadyLiked}
              onPressedChange={handleLikeButtonClicked}
            >
              <span className="flex items-center gap-4 p-1 text-lg">
                {likes}
                <ThumbsUp size={16} />
              </span>
            </Toggle>
            <button onClick={() => setShowComments(!showComments)}>
              {post.comments.length} Comments
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full">
          <AddComment postId={post.id} user={user} />
          {showComments ? (
            <CommentList postComments={comments} postId={post.id} />
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
