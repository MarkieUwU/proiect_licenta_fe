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
import { ArrowUp, ArrowDown } from 'lucide-react';
import { getAdminPosts, updatePostStatus } from '../../apis/admin.api';
import { toast } from 'sonner';
import { AdminPost } from '@/modules/Posts/models/post.models';
import { ContentStatus } from '@/core/models/content-status.enum';
import { deletePost } from '@/modules/Posts/apis/post.api';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TablePagination } from '@/components/ui/table-pagination';

type SortField = 'id' | 'title' | 'status' | 'createdAt' | 'updatedAt';

export default function AdminPosts() {
  const [searchInput, setSearchInput] = useState('');
  const [statusInput, setStatusInput] = useState<ContentStatus>(ContentStatus.ALL);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ContentStatus>(ContentStatus.ALL);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['adminPosts', { search, status, sortField, sortOrder, page, pageSize }],
    queryFn: () =>
      getAdminPosts({
        search,
        status,
        sort: sortField,
        order: sortOrder,
        page,
        limit: pageSize,
      }),
  });

  const posts = data?.posts || [];
  const total = data?.total || 0;

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updatePostStatus(id, status),
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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortField === 'createdAt') {
        setSortOrder('asc');
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

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return null;
    }
    return sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleStatusInputChange = (value: ContentStatus) => {
    setStatusInput(value);
  };

  const handleSearch = () => {
    setSearch(searchInput);
    setStatus(statusInput);
    setPage(1);
  };

  const handleReset = () => {
    setSearchInput('');
    setStatusInput(ContentStatus.ALL);
    setSearch('');
    setStatus(ContentStatus.ALL);
    setPage(1);
    setSortField('createdAt');
    setSortOrder('desc');
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
    <div className='space-y-4'>
      <div className='flex items-center gap-2'>
        <Input
          placeholder='Search posts...'
          value={searchInput}
          onChange={(e) => handleSearchInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          className='w-[250px]'
        />
        <Select value={statusInput} onValueChange={handleStatusInputChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ContentStatus.ALL}>
              {t('Enums.ContentStatus.ALL')}
            </SelectItem>
            <SelectItem value={ContentStatus.ACTIVE}>
              {t('Enums.ContentStatus.ACTIVE')}
            </SelectItem>
            <SelectItem value={ContentStatus.REPORTED}>
              {t('Enums.ContentStatus.REPORTED')}
            </SelectItem>
            <SelectItem value={ContentStatus.ARCHIVED}>
              {t('Enums.ContentStatus.ARCHIVED')}
            </SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSearch} variant='default'>
          Search
        </Button>
        <Button onClick={handleReset} variant='outline'>
          Reset
        </Button>
      </div>
      <div className='rounded-md border'>
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
                onClick={() => handleSort('title')}
              >
                <div className='flex items-center gap-1'>
                  Title
                  {getSortIcon('title')}
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
                onClick={() => handleSort('createdAt')}
              >
                <div className='flex items-center gap-1'>
                  Created
                  {getSortIcon('createdAt')}
                </div>
              </TableHead>
              <TableHead
                className='cursor-pointer hover:bg-muted/50 transition-colors'
                onClick={() => handleSort('updatedAt')}
              >
                <div className='flex items-center gap-1'>
                  Updated
                  {getSortIcon('updatedAt')}
                </div>
              </TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10}>Loading...</TableCell>
              </TableRow>
            ) : total > 0 ? (
              (posts as AdminPost[]).map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.status === ContentStatus.ACTIVE
                          ? 'default'
                          : post.status === ContentStatus.ARCHIVED
                            ? 'secondary'
                            : post.status === ContentStatus.REPORTED
                              ? 'destructive'
                              : 'outline'
                      }
                    >
                      {t(`Enums.ContentStatus.${post.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Avatar className='w-8 h-8 me-1'>
                        {post.user.profileImage ? (
                          <AvatarImage
                            src={post.user.profileImage}
                            alt={post.user.username}
                          />
                        ) : (
                          <AvatarFallback>{post.user.username}</AvatarFallback>
                        )}
                      </Avatar>
                      <span>{post.user?.username}</span>
                    </div>
                  </TableCell>
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
                          <i className='ri-more-fill'></i>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {post.status !== ContentStatus.ACTIVE && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus.mutate({
                                id: post.id,
                                status: ContentStatus.ACTIVE,
                              })
                            }
                          >
                            Approve
                          </DropdownMenuItem>
                        )}
                        {post.status !== ContentStatus.ARCHIVED && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateStatus.mutate({
                                id: post.id,
                                status: ContentStatus.ARCHIVED,
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
      </div>
      {data && (
        <TablePagination
          currentPage={page}
          totalPages={data.pages}
          pageSize={pageSize}
          totalItems={total}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
