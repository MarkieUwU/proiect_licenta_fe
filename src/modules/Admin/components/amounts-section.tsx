import { getAllComments } from '@/modules/Posts/apis/comment.api';
import { getAllLikes } from '@/modules/Posts/apis/like.api';
import { getAllPosts } from '@/modules/Posts/apis/post.api';
import {
  getAllConnections,
  getUsersList,
} from '@/modules/Profile/apis/user.api';
import { useQuery } from '@tanstack/react-query';
import AmountCard from './amount-card';
import { useTranslation } from 'react-i18next';

const AmountsSection: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.Statistics' });

  const usersResponse = useQuery({
    queryKey: ['usersList'],
    queryFn: () => getUsersList(),
  });

  const connectionsResponse = useQuery({
    queryKey: ['connectionsList'],
    queryFn: () => getAllConnections(),
  });

  const postsResponse = useQuery({
    queryKey: ['postsList'],
    queryFn: () => getAllPosts(),
  });

  const commentsResponse = useQuery({
    queryKey: ['commentsList'],
    queryFn: () => getAllComments(),
  });

  const likesResponse = useQuery({
    queryKey: ['likesList'],
    queryFn: () => getAllLikes(),
  });

  return (
    <div className='flex flex-wrap justify-center w-full min-w-[400px] gap-5'>
      <AmountCard
        title={t('Users')}
        amount={usersResponse.data?.length ?? 0}
        loading={usersResponse.isPending}
      />
      <AmountCard
        title={t('Connections')}
        amount={connectionsResponse.data?.length ?? 0}
        loading={connectionsResponse.isPending}
      />
      <AmountCard
        title={t('Posts')}
        amount={postsResponse.data?.length ?? 0}
        loading={postsResponse.isPending}
      />
      <AmountCard
        title={t('Comments')}
        amount={commentsResponse.data?.length ?? 0}
        loading={commentsResponse.isPending}
      />
      <AmountCard
        title={t('Likes')}
        amount={likesResponse.data?.length ?? 0}
        loading={likesResponse.isPending}
      />
    </div>
  );
};

export default AmountsSection;
