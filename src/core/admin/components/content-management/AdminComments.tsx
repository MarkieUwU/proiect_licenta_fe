import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { getAdminComments, updateCommentStatus } from '../../apis/admin.api';
import { toast } from 'sonner';
import { AdminComment } from '../../models/comments.models';
import { CommentStatus } from '@/modules/Posts/models/comment.models';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { deleteComment } from '@/modules/Posts/apis/comment.api';
import { useTranslation } from 'react-i18next';

const PAGE_SIZE = 10;

export default function AdminComments() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CommentStatus>(CommentStatus.ALL);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['adminComments', { search, status, page }],
    queryFn: () =>
      getAdminComments({
        search,
        status,
        page,
        pageSize: PAGE_SIZE,
      }),
  });

  const comments = data || [];

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: CommentStatus }) =>
      updateCommentStatus(id, status),
    onSuccess: () => {
      toast.success('Status updated');
      queryClient.invalidateQueries({ queryKey: ['adminComments'] });
    },
    onError: () => toast.error('Failed to update status'),
  });

  const removeComment = useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      toast.success(t('PostsFeed.PostCard.CommentCard.DeleteSuccessMessage'));
      queryClient.invalidateQueries({ queryKey: ['adminComments'] });
    },
    onError: () =>
      toast.error(t('PostsFeed.PostCard.CommentCard.DeleteErrorMessage')),
  });

  return (
    <div>
      <div className='flex flex-wrap items-center gap-2 mb-4'>
        <Input
          placeholder='Search comments...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-64'
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as CommentStatus)}
          className='border rounded px-2 py-1'
        >
          <option value={CommentStatus.ALL}>All Statuses</option>
          <option value={CommentStatus.ACTIVE}>Active</option>
          <option value={CommentStatus.ARCHIVED}>Archived</option>
          <option value={CommentStatus.REPORTED}>Reported</option>
        </select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Post</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Reports</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8}>Loading...</TableCell>
            </TableRow>
          ) : comments.length ? (
            comments.map((comment: AdminComment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.id}</TableCell>
                <TableCell className='max-w-xs truncate'>
                  {comment.content}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      comment.status === CommentStatus.ACTIVE
                        ? 'default'
                        : comment.status === CommentStatus.ARCHIVED
                          ? 'secondary'
                          : comment.status === CommentStatus.REPORTED
                            ? 'destructive'
                            : 'outline'
                    }
                  >
                    {comment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Avatar className='w-8 h-8'>
                      {comment.user.profileImage ? (
                        <AvatarImage
                          src={comment.user.profileImage}
                          alt={comment.user.username}
                        />
                      ) : (
                        <AvatarFallback>
                          {comment.user.username[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span>{comment.user.username}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='truncate max-w-xs block'>
                    {comment.post.title}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(comment.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {comment.reports.length > 0 ? (
                    <Badge variant='destructive'>
                      {comment.reports.length} report(s)
                    </Badge>
                  ) : (
                    <Badge variant='outline'>0</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size='icon' variant='ghost'>
                        <ChevronDown className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {comment.status !== CommentStatus.ACTIVE && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus.mutate({
                              id: comment.id,
                              status: CommentStatus.ACTIVE,
                            })
                          }
                        >
                          Approve
                        </DropdownMenuItem>
                      )}
                      {comment.status !== CommentStatus.ARCHIVED && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus.mutate({
                              id: comment.id,
                              status: CommentStatus.ARCHIVED,
                            })
                          }
                        >
                          Archive
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => removeComment.mutate(Number(comment.id))}
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
              <TableCell colSpan={8}>No comments found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='flex items-center justify-between mt-4'>
        <span>Page {page}</span>
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
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
