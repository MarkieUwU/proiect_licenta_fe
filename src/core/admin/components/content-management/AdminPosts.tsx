import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table, TableHeader, TableRow, TableCell, TableBody
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { getAdminPosts, updatePostStatus } from '../../apis/admin.api';
import { toast } from 'sonner';
import { AdminPost, PostStatus } from '@/modules/Posts/models/post.models';
import { deletePost } from '@/modules/Posts/apis/post.api';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 10;

export default function AdminPosts() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<PostStatus>(PostStatus.ALL);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['adminPosts', { search, status, sort, order, page }],
    queryFn: () =>
      getAdminPosts({
        search,
        status,
        sort,
        order,
        page,
        limit: PAGE_SIZE,
      }),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => updatePostStatus(id, status),
    onSuccess: () => {
      toast.success('Status updated');
      queryClient.invalidateQueries({ queryKey: ['adminPosts'] });
    },
    onError: () => toast.error('Failed to update status'),
  });

  const removePost = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      toast.success('Post deleted');
      queryClient.invalidateQueries({ queryKey: ['adminPosts'] });
    },
    onError: () => toast.error('Failed to delete post'),
  });

  const total = data?.total || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      <div className='flex flex-wrap items-center gap-2 mb-4'>
        <Input
          placeholder='Search posts...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-64'
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as PostStatus)}
          className='border rounded px-2 py-1'
        >
          <option value={PostStatus.ALL}>All Statuses</option>
          <option value={PostStatus.ACTIVE}>Active</option>
          <option value={PostStatus.ARCHIVED}>Archived</option>
          <option value={PostStatus.REPORTED}>Reported</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className='border rounded px-2 py-1'
        >
          <option value='createdAt'>Created</option>
          <option value='title'>Title</option>
          <option value='status'>Status</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
          className='border rounded px-2 py-1'
        >
          <option value='desc'>Desc</option>
          <option value='asc'>Asc</option>
        </select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Updated</TableCell>
            <TableCell>Comments</TableCell>
            <TableCell>Likes</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={10}>Loading...</TableCell>
            </TableRow>
          ) : data?.posts?.length ? (
            (data.posts as AdminPost[]).map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell className='max-w-xs truncate'>
                  {post.content}
                </TableCell>
                <TableCell>
                  <span
                    className={
                      post.status === PostStatus.ACTIVE
                        ? 'text-green-600'
                        : post.status === PostStatus.ARCHIVED
                          ? 'text-gray-500'
                          : post.status === PostStatus.REPORTED
                            ? 'text-yellow-600'
                            : ''
                    }
                  >
                    {post.status}
                  </span>
                </TableCell>
                <TableCell>{post.user?.fullName || 'Unknown'}</TableCell>
                <TableCell>
                  {new Date(post.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(post.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell>{post.comments}</TableCell>
                <TableCell>{post.likes}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size='icon' variant='ghost'>
                        <ChevronDown className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {post.status !== PostStatus.ACTIVE && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus.mutate({
                              id: post.id,
                              status: PostStatus.ACTIVE,
                            })
                          }
                        >
                          Approve
                        </DropdownMenuItem>
                      )}
                      {post.status !== PostStatus.ARCHIVED && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus.mutate({
                              id: post.id,
                              status: PostStatus.ARCHIVED,
                            })
                          }
                        >
                          Archive
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => removePost.mutate(post.id)}
                        className='text-red-600'
                      >
                        {t('Actions.Delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10}>No posts found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='flex items-center justify-between mt-4'>
        <span>
          Page {page} of {totalPages}
        </span>
        <div className='space-x-2'>
          <Button
            size='sm'
            variant='outline'
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <Button
            size='sm'
            variant='outline'
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
} 