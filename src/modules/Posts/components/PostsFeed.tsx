import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { getFilteredPosts } from '../apis/post.api';
import { Post } from '../models/post.models';
import PostCard from './PostCard';
import UpsertPostModal from './UpsertPostModal';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import NoRecordsFound from '@/components/ui/NoRecordsFound';
import { useAuth } from '@/core/auth/AuthContext';

export const PostsFeed: React.FC = () => {
  const [postModalOpened, setPostModalOpened] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.PostsFeed' });
  const { user } = useAuth();
  const postResponse = useQuery({
    queryKey: ['posts'],
    queryFn: () => getFilteredPosts({ sortCriteria: { createdAt: 'desc' }, userId: user!.id}),
    enabled: false
  });

  useEffect(() => {
    postResponse.refetch();
  }, [user!.id])

  let postCards;

  if (postResponse.isPending) {
    postCards = (
      <div className='flex justify-center p-4'>
        <LoaderCircle className='animate-spin' />
      </div>
    );
  } else if (!postResponse.data?.length) {
   postCards = <NoRecordsFound text={t('NoRecords')} />;
  } else {
    postCards = (
      <div className='flex flex-col overflow-y-auto h-full gap-2 pb-3'>
        {postResponse.data.map((post: Post) => (
          <PostCard key={post.id} post={post} requestRefetch={() => postResponse.refetch()} />
        ))}
      </div>
    );
  }
  return (
    <>
      <main className='w-[800px] min-w-[400px] flex flex-col gap-3 mx-auto lg:mx-0'>
        <Input
          placeholder={t('InputPlaceholder')}
          className='h-14 rounded-xl'
          onClick={() => setPostModalOpened(true)}
        />
        {postCards}
      </main>
      <UpsertPostModal
        open={postModalOpened}
        onOpenChange={(value) => setPostModalOpened(value)}
        requestRefetch={() => postResponse.refetch()}
      />
    </>
  );
};
