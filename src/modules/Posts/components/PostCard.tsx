import React, { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
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
} from '@/components/ui/card';
import { ThumbsUp } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { toast } from 'sonner';
import { useAuth } from '@/core/auth/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UpsertPostModal from './UpsertPostModal';
import { deletePost } from '../apis/post.api';
import { DeleteDialog } from '@/components/ui/DeleteDialog';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';

interface PostProps {
  post: Post;
  requestRefetch: () => void;
}

const PostCard: React.FC<PostProps> = ({ post, requestRefetch }: PostProps) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes?.length);
  const [commentsCount, setCommentsCount] = useState(post.comments?.length);
  const [showComments, setShowComments] = useState(false);
  const initials = getInitials(post.user.username);
  const getIfLiked = post.likes?.some((like) => like.userId === user!.id);
  const [alreadyLiked, setAlreadyLiked] = useState(getIfLiked);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.PostsFeed.PostCard' });
  const navigate = useNavigate();
  const ownPost = user!.id === post.userId;

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
      requestRefetch();
      toast.success(t('SuccessMessage'));
    },
  });

  const likePost = () => {
    likeMutation.mutate({ userId: user!.id, postId: post.id });
    setLikes(likes + 1);
  };

  const unlikePost = () => {
    unlikeMutation.mutate({ userId: user!.id, postId: post.id });
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

  const navigateToProfile = () => {
    navigate({ to: `/${post.user.username}/profile` })
  }

  return (
    <>
      <Card className='p-2'>
        <CardHeader className='p-4'>
          <CardTitle>
            <div className='flex justify-between'>
              <div
                className='flex items-center gap-3 mb-2 cursor-pointer'
                onClick={navigateToProfile}
              >
                <AvatarComponent initials={initials} image={post.user.profileImage}></AvatarComponent>
                <div className='flex flex-col'>
                  <span className='text-lg'>{post.user.fullName}</span>
                  <span className='text-xs text-gray-500'>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {ownPost && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-xl rounded-full'
                    >
                      <i className='ri-more-fill'></i>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem onClick={() => setEditModalOpened(true)}>
                      {t('DropDown.Edit')}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteModalOpened(true)}
                    >
                      {t('DropDown.Delete')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className='px-5 pb-4 pt-0'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-lg'>
                <strong>{post.title}</strong>
              </h2>
              {!!post.image.length && (
                <div className='flex justify-center w-full max-h-[590px]'>
                  <img
                    src={post.image}
                    className='mt-2 w-full rounded'
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
              <p>{post.content}</p>
            </div>
            <div className='flex justify-between items-end'>
              <Toggle
                variant='outline'
                className='rounded-full'
                pressed={alreadyLiked}
                onPressedChange={handleLikeButtonClicked}
              >
                <span className='flex items-center gap-4 p-1 text-lg'>
                  {likes}
                  <ThumbsUp size={16} />
                </span>
              </Toggle>
              <Toggle
                variant='default'
                pressed={showComments}
                onClick={() => setShowComments(!showComments)}
              >
                {commentsCount} {t('Comments')}
              </Toggle>
            </div>
          </div>
        </CardContent>
        <CardFooter className='px-3 pb-2 pt-0'>
          <div className='w-full'>
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

      <UpsertPostModal
        post={post}
        open={editModalOpened}
        onOpenChange={(value) => setEditModalOpened(value)}
        requestRefetch={() => requestRefetch()}
      />
      <DeleteDialog
        title={t('DeleteDialog.Title')}
        description={t('DeleteDialog.Description')}
        open={deleteModalOpened}
        loading={deletePostMutation.isPending}
        onDelete={handleDeletePost}
        onOpenChange={(value) => setDeleteModalOpened(value)}
      />
    </>
  );
};

export default PostCard;
