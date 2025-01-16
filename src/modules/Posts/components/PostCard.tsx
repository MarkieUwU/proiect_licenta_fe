import React, { useContext, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '../models/post.models';
import { likeAPost, unlikeAPost } from '../apis/like.api';
import AddComment from './AddComment';
import CommentList from './CommentList';
import { AvatarComponent } from '@/layout/components/Avatar';
import { getInitials } from '@/core/utils/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { ThumbsUp } from 'lucide-react';
import { Toggle } from '@/shared/ui/toggle';
import { toast } from 'sonner';
import { LoggedUserContext } from '@/shared/hooks/userContext';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import PostModal from './UpsertPostModal';
import { deletePost } from '../apis/post.api';
import { DeleteDialog } from '@/shared/components/DeleteDialog';

interface PostProps {
  post: Post;
}

const PostCard: React.FC<PostProps> = ({ post }: PostProps) => {
  const user = useContext(LoggedUserContext);
  const [likes, setLikes] = useState(post.likes?.length);
  const [commentsCount, setCommentsCount] = useState(post.comments?.length);
  const [showComments, setShowComments] = useState(false);
  const initials = getInitials(post.user.username);
  const getIfLiked = post.likes?.some((like) => like.userId === user.id);
  const [alreadyLiked, setAlreadyLiked] = useState(getIfLiked);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: likeAPost,
    retry: 2,
    onError: () => {
      setLikes(likes - 1);
      setAlreadyLiked(false);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: unlikeAPost,
    retry: 2,
    onError: () => {
      setLikes(likes + 1);
      setAlreadyLiked(true);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully');
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

  const handleCreateComment = () => {
    setShowComments(true);
    setCommentsCount(commentsCount + 1);
  };

  const handleDeletePost = () => {
    deletePostMutation.mutate(post.id);
  };

  return (
    <>
      <Card className="p-2">
        <CardHeader className="p-4">
          <CardTitle>
            <div className="flex justify-between">
              <div className="flex items-center gap-3 mb-2">
                <AvatarComponent initials={initials}></AvatarComponent>
                <div className="flex flex-col">
                  <span className="text-lg">{post.user.fullName}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-xl rounded-full"
                  >
                    <i className="ri-more-fill"></i>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setEditModalOpened(true)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setDeleteModalOpened(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
            <div className="flex justify-between items-end">
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
              <Toggle
                variant="default"
                pressed={showComments}
                onClick={() => setShowComments(!showComments)}
              >
                {commentsCount} Comments
              </Toggle>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-3 pb-2 pt-0">
          <div className="w-full">
            <AddComment
              postId={post.id}
              onCreateComment={handleCreateComment}
            />
            {showComments && (
              <CommentList
                postId={post.id}
                onDeletedComment={() => setCommentsCount(commentsCount - 1)}
              />
            )}
          </div>
        </CardFooter>
      </Card>

      <PostModal
        post={post}
        open={editModalOpened}
        onOpenChange={(value) => setEditModalOpened(value)}
      />
      <DeleteDialog
        title={'Are you sure?'}
        description={
          "This action cannot be undone. This will permanently delete this post and you won't be able to recover the data."
        }
        open={deleteModalOpened}
        loading={deletePostMutation.isPending}
        onDelete={handleDeletePost}
        onOpenChange={(value) => setDeleteModalOpened(value)}
      />
    </>
  );
};

export default PostCard;
