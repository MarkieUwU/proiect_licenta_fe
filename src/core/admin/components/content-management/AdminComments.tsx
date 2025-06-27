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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import { getAdminComments, updateCommentStatus } from '../../apis/admin.api';
import { toast } from 'sonner';
import { AdminComment } from '../../models/comments.models';
import { ContentStatus } from '@/core/models/content-status.enum';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { deleteComment } from '@/modules/Posts/apis/comment.api';
import { useTranslation } from 'react-i18next';
import { TablePagination } from '@/components/ui/table-pagination';

type CommentSortField = 'id' | 'text' | 'status' | 'createdAt' | 'postId';

export default function AdminComments() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ContentStatus>(ContentStatus.ALL);
  const [sortField, setSortField] = useState<CommentSortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['adminComments', { search, status, sortField, sortOrder, page, pageSize }],
    queryFn: () =>
      getAdminComments({
        search,
        status,
        sort: sortField,
        order: sortOrder,
        page,
        pageSize,
      }),
  });

  const comments = data?.comments || [];
  const total = data?.total || 0;

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContentStatus }) =>
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

  const handleSort = (field: CommentSortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortField('createdAt');
        setSortOrder('desc');
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setPage(1);
  };

  const getSortIcon = (field: CommentSortField) => {
    if (sortField !== field) {
      return null;
    }
    return sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: ContentStatus) => {
    setStatus(value);
    setPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  return (
    <div>
      <div className='flex flex-wrap items-center gap-2 mb-4'>
        <Input
          placeholder='Search comments...'
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className='w-64'
        />
        <Select value={status} onValueChange={(value) => handleStatusChange(value as ContentStatus)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ContentStatus.ALL}>{t('Enums.ContentStatus.ALL')}</SelectItem>
            <SelectItem value={ContentStatus.ACTIVE}>{t('Enums.ContentStatus.ACTIVE')}</SelectItem>
            <SelectItem value={ContentStatus.ARCHIVED}>{t('Enums.ContentStatus.ARCHIVED')}</SelectItem>
            <SelectItem value={ContentStatus.REPORTED}>{t('Enums.ContentStatus.REPORTED')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className='cursor-pointer hover:bg-muted/50 transition-colors'
              onClick={() => handleSort('id')}
            >
              <div className='flex items-center gap-1'>
                ID
                {getSortIcon('id')}
              </div>
            </TableHead>
            <TableHead 
              className='cursor-pointer hover:bg-muted/50 transition-colors'
              onClick={() => handleSort('text')}
            >
              <div className='flex items-center gap-1'>
                Text
                {getSortIcon('text')}
              </div>
            </TableHead>
            <TableHead 
              className='cursor-pointer hover:bg-muted/50 transition-colors'
              onClick={() => handleSort('status')}
            >
              <div className='flex items-center gap-1'>
                Status
                {getSortIcon('status')}
              </div>
            </TableHead>
            <TableHead>Author</TableHead>
            <TableHead 
              className='cursor-pointer hover:bg-muted/50 transition-colors'
              onClick={() => handleSort('postId')}
            >
              <div className='flex items-center gap-1'>
                Post ID
                {getSortIcon('postId')}
              </div>
            </TableHead>
            <TableHead 
              className='cursor-pointer hover:bg-muted/50 transition-colors'
              onClick={() => handleSort('createdAt')}
            >
              <div className='flex items-center gap-1'>
                Created
                {getSortIcon('createdAt')}
              </div>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7}>Loading...</TableCell>
            </TableRow>
          ) : total > 0 ? (
            comments.map((comment: AdminComment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.id}</TableCell>
                <TableCell className='max-w-xs truncate'>
                  {comment.text}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      comment.status === ContentStatus.ACTIVE
                        ? 'default'
                        : comment.status === ContentStatus.ARCHIVED
                          ? 'secondary'
                          : comment.status === ContentStatus.REPORTED
                            ? 'destructive'
                            : 'outline'
                    }
                  >
                    {t(`Enums.ContentStatus.${comment.status}`)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Avatar className='w-8 h-8 me-1'>
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
                  {comment.post.id}
                </TableCell>
                <TableCell>
                  {new Date(comment.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size='icon' variant='ghost'>
                        <ChevronDown className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {comment.status !== ContentStatus.ACTIVE && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus.mutate({
                              id: comment.id,
                              status: ContentStatus.ACTIVE,
                            })
                          }
                        >
                          Approve
                        </DropdownMenuItem>
                      )}
                      {comment.status !== ContentStatus.ARCHIVED && (
                        <DropdownMenuItem
                          onClick={() =>
                            updateStatus.mutate({
                              id: comment.id,
                              status: ContentStatus.ARCHIVED,
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
              <TableCell colSpan={7}>No comments found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data && (
        <TablePagination
          currentPage={page}
          totalPages={Math.ceil(total / pageSize)}
          pageSize={pageSize}
          totalItems={total}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
