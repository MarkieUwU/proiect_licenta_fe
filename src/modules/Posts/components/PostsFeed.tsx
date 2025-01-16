import React, { useState } from 'react';
import NoRecordsFound from '@/core/components/NoRecordsFound';
import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { getFilteredPosts } from '../apis/post.api';
import { Post } from '../models/post.models';
import PostCard from './PostCard';
import PostModal from './UpsertPostModal';

export const PostsFeed: React.FC = () => {
  const [postModalOpened, setPostModalOpened] = useState(false);
  const postResponse = useQuery({
    queryKey: ['posts'],
    queryFn: () => getFilteredPosts({ createdAt: 'desc' }),
  });

  if (postResponse.isLoading) {
    return <LoaderCircle className="animate-spin" />;
  }

  const postsList = postResponse.data;

  const postCards = postsList.map((post: Post) => (
    <PostCard key={post.id} post={post} />
  ));

  return (
    <main className='col-span-4 max-w-[750px] flex flex-col'>
      <input
        type='text'
        placeholder="What's on your mind?"
        className='w-full p-4 mb-4 border rounded-lg'
        onClick={() => setPostModalOpened(true)}
      />
      <PostModal
        open={postModalOpened}
        onOpenChange={(value) => setPostModalOpened(value)}
      />
      {postCards.length ? (
        <div className='flex flex-col overflow-y-auto gap-1'>{postCards}</div>
      ) : (
        <NoRecordsFound text='It seems like there are no posts to show' />
      )}
    </main>
  );
};
