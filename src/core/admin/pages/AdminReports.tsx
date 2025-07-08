import { useQuery } from '@tanstack/react-query';
import { getAllPostReports, getAllCommentReports } from '../apis/admin.api';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { TablePagination } from '@/components/ui/table-pagination';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { formatLocalizedDateTime } from '@/core/utils/date.utils';

type PostReportSortField =
  | 'id'
  | 'postTitle'
  | 'authorUsername'
  | 'reporter'
  | 'reason'
  | 'createdAt';
type CommentReportSortField =
  | 'id'
  | 'commentContent'
  | 'authorUsername'
  | 'reporter'
  | 'reason'
  | 'createdAt';

export default function AdminReports() {
  const { t } = useTranslation();
  const [postFilters, setPostFilters] = useState({
    postId: '',
    postTitle: '',
    authorId: '',
    authorUsername: '',
  });

  const [commentFilters, setCommentFilters] = useState({
    commentId: '',
    commentContent: '',
    postId: '',
    authorUsername: '',
  });

  const [postSortField, setPostSortField] =
    useState<PostReportSortField>('createdAt');
  const [postSortOrder, setPostSortOrder] = useState<'asc' | 'desc'>('desc');

  const [commentSortField, setCommentSortField] =
    useState<CommentReportSortField>('createdAt');
  const [commentSortOrder, setCommentSortOrder] = useState<'asc' | 'desc'>(
    'desc'
  );

  // Pagination state for post reports
  const [postPage, setPostPage] = useState(1);
  const [postPageSize, setPostPageSize] = useState(20);

  // Pagination state for comment reports
  const [commentPage, setCommentPage] = useState(1);
  const [commentPageSize, setCommentPageSize] = useState(20);

  const postReportsQuery = useQuery({
    queryKey: [
      'postReports',
      postFilters,
      postSortField,
      postSortOrder,
      postPage,
      postPageSize,
    ],
    queryFn: () =>
      getAllPostReports({
        ...(postFilters.postId && { postId: Number(postFilters.postId) }),
        ...(postFilters.postTitle && { postTitle: postFilters.postTitle }),
        ...(postFilters.authorId && { authorId: Number(postFilters.authorId) }),
        ...(postFilters.authorUsername && {
          authorUsername: postFilters.authorUsername,
        }),
        sort: postSortField,
        order: postSortOrder,
        page: postPage,
        limit: postPageSize,
      }),
  });

  const commentReportsQuery = useQuery({
    queryKey: [
      'commentReports',
      commentFilters,
      commentSortField,
      commentSortOrder,
      commentPage,
      commentPageSize,
    ],
    queryFn: () =>
      getAllCommentReports({
        ...(commentFilters.commentId && {
          commentId: Number(commentFilters.commentId),
        }),
        ...(commentFilters.commentContent && {
          commentContent: commentFilters.commentContent,
        }),
        ...(commentFilters.postId && { postId: Number(commentFilters.postId) }),
        ...(commentFilters.authorUsername && {
          authorUsername: commentFilters.authorUsername,
        }),
        sort: commentSortField,
        order: commentSortOrder,
        page: commentPage,
        limit: commentPageSize,
      }),
  });

  const handlePostSort = (field: PostReportSortField) => {
    if (postSortField === field) {
      // Toggle between asc and desc for the same field
      setPostSortOrder(postSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New field selected, start with asc
      setPostSortField(field);
      setPostSortOrder('asc');
    }
  };

  const handleCommentSort = (field: CommentReportSortField) => {
    if (commentSortField === field) {
      // Toggle between asc and desc for the same field
      setCommentSortOrder(commentSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New field selected, start with asc
      setCommentSortField(field);
      setCommentSortOrder('asc');
    }
  };

  const getPostSortIcon = (field: PostReportSortField) => {
    if (postSortField !== field) {
      return null;
    }
    return postSortOrder === 'asc' ? (
      <ArrowUp className='h-4 w-4' />
    ) : (
      <ArrowDown className='h-4 w-4' />
    );
  };

  const getCommentSortIcon = (field: CommentReportSortField) => {
    if (commentSortField !== field) {
      return null;
    }
    return commentSortOrder === 'asc' ? (
      <ArrowUp className='h-4 w-4' />
    ) : (
      <ArrowDown className='h-4 w-4' />
    );
  };

  // Add local state for filter inputs
  const [postFilterInputs, setPostFilterInputs] = useState(postFilters);
  const [commentFilterInputs, setCommentFilterInputs] =
    useState(commentFilters);

  // Search/Reset handlers for post reports
  const handlePostInputChange = (updates: Partial<typeof postFilters>) => {
    setPostFilterInputs((prev) => ({ ...prev, ...updates }));
  };
  const handlePostSearch = () => {
    setPostFilters(postFilterInputs);
    setPostPage(1);
  };
  const handlePostReset = () => {
    setPostFilterInputs({
      postId: '',
      postTitle: '',
      authorId: '',
      authorUsername: '',
    });
    setPostFilters({
      postId: '',
      postTitle: '',
      authorId: '',
      authorUsername: '',
    });
    setPostSortField('createdAt');
    setPostSortOrder('desc');
    setPostPage(1);
  };

  // Search/Reset handlers for comment reports
  const handleCommentInputChange = (
    updates: Partial<typeof commentFilters>
  ) => {
    setCommentFilterInputs((prev) => ({ ...prev, ...updates }));
  };
  const handleCommentSearch = () => {
    setCommentFilters(commentFilterInputs);
    setCommentPage(1);
  };
  const handleCommentReset = () => {
    setCommentFilterInputs({
      commentId: '',
      commentContent: '',
      postId: '',
      authorUsername: '',
    });
    setCommentFilters({
      commentId: '',
      commentContent: '',
      postId: '',
      authorUsername: '',
    });
    setCommentSortField('createdAt');
    setCommentSortOrder('desc');
    setCommentPage(1);
  };

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-xl font-bold ms-2'>
          {t('Pages.Admin.AdminReports.Posts.Title')}
        </h1>
        <Card>
          <CardHeader>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='postId'>
                  {t('Pages.Admin.AdminReports.Filters.PostID')}
                </Label>
                <Input
                  id='postId'
                  placeholder={t(
                    'Pages.Admin.AdminReports.Filters.PostIDPlaceholder'
                  )}
                  value={postFilterInputs.postId}
                  onChange={(e) =>
                    handlePostInputChange({ postId: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePostSearch();
                  }}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='postTitle'>
                  {t('Pages.Admin.AdminReports.Filters.PostTitle')}
                </Label>
                <Input
                  id='postTitle'
                  placeholder={t(
                    'Pages.Admin.AdminReports.Filters.PostTitlePlaceholder'
                  )}
                  value={postFilterInputs.postTitle}
                  onChange={(e) =>
                    handlePostInputChange({ postTitle: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePostSearch();
                  }}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='authorId'>
                  {t('Pages.Admin.AdminReports.Filters.AuthorID')}
                </Label>
                <Input
                  id='authorId'
                  placeholder={t(
                    'Pages.Admin.AdminReports.Filters.AuthorIDPlaceholder'
                  )}
                  value={postFilterInputs.authorId}
                  onChange={(e) =>
                    handlePostInputChange({ authorId: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePostSearch();
                  }}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='authorUsername'>
                  {t('Pages.Admin.AdminReports.Filters.AuthorUsername')}
                </Label>
                <Input
                  id='authorUsername'
                  placeholder={t(
                    'Pages.Admin.AdminReports.Filters.AuthorUsernamePlaceholder'
                  )}
                  value={postFilterInputs.authorUsername}
                  onChange={(e) =>
                    handlePostInputChange({ authorUsername: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePostSearch();
                  }}
                />
              </div>
              <div className='flex flex-col justify-end gap-2'>
                <div className='flex gap-2'>
                  <Button onClick={handlePostSearch}>
                    {t('Pages.Admin.AdminReports.Filters.Search')}
                  </Button>
                  <Button variant='outline' onClick={handlePostReset}>
                    {t('Pages.Admin.AdminReports.Filters.Reset')}
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {postReportsQuery.isLoading ? (
              <Skeleton className='h-32 w-full' />
            ) : (
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors min-w-[60px]'
                        onClick={() => handlePostSort('id')}
                      >
                        <div className='flex items-center gap-1'>
                          {t('Pages.Admin.AdminReports.Posts.Table.ID')}
                          {getPostSortIcon('id')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors min-w-[200px]'
                        onClick={() => handlePostSort('postTitle')}
                      >
                        <div className='flex items-center gap-1'>
                          {t('Pages.Admin.AdminReports.Posts.Table.PostTitle')}
                          {getPostSortIcon('postTitle')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors min-w-[120px]'
                        onClick={() => handlePostSort('authorUsername')}
                      >
                        <div className='flex items-center gap-1'>
                          {t('Pages.Admin.AdminReports.Posts.Table.PostAuthor')}
                          {getPostSortIcon('authorUsername')}
                        </div>
                      </TableHead>
                      <TableHead>
                        {t('Pages.Admin.AdminReports.Posts.Table.Reporter')}
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors min-w-[150px]'
                        onClick={() => handlePostSort('reason')}
                      >
                        <div className='flex items-center gap-1'>
                          {t('Pages.Admin.AdminReports.Posts.Table.Reason')}
                          {getPostSortIcon('reason')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors min-w-[140px]'
                        onClick={() => handlePostSort('createdAt')}
                      >
                        <div className='flex items-center gap-1'>
                          {t('Pages.Admin.AdminReports.Posts.Table.CreatedAt')}
                          {getPostSortIcon('createdAt')}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {postReportsQuery.data?.reports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6}>
                          {t('Pages.Admin.AdminReports.NoRecords')}
                        </TableCell>
                      </TableRow>
                    ) : (
                      postReportsQuery.data?.reports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className='font-mono text-sm'>
                            {report.id}
                          </TableCell>
                          <TableCell className='max-w-xs truncate'>
                            {report.post.title}
                          </TableCell>
                          <TableCell>{report.post.user.username}</TableCell>
                          <TableCell>{report.user.username}</TableCell>
                          <TableCell>{report.reason}</TableCell>
                          <TableCell>
                            {formatLocalizedDateTime(
                              new Date(report.createdAt)
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                {postReportsQuery.data && (
                  <TablePagination
                    currentPage={postPage}
                    totalPages={postReportsQuery.data.pages}
                    pageSize={postPageSize}
                    totalItems={postReportsQuery.data.total}
                    onPageChange={setPostPage}
                    onPageSizeChange={(size) => {
                      setPostPageSize(size);
                      setPostPage(1);
                    }}
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col gap-4'>
        <h1 className='text-xl font-bold ms-2'>
          {t('Pages.Admin.AdminReports.Comments.Title')}
        </h1>
        <Card>
          <CardHeader>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='commentId'>
                  {t('Pages.Admin.AdminReports.Filters.CommentID')}
                </Label>
                <Input
                  id='commentId'
                  placeholder={t(
                    'Pages.Admin.AdminReports.Filters.CommentIDPlaceholder'
                  )}
                  value={commentFilterInputs.commentId}
                  onChange={(e) =>
                    handleCommentInputChange({ commentId: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCommentSearch();
                  }}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='commentContent'>
                  {t('Pages.Admin.AdminReports.Filters.CommentContent')}
                </Label>
                <Input
                  id='commentContent'
                  placeholder={t(
                    'Pages.Admin.AdminReports.Filters.CommentContentPlaceholder'
                  )}
                  value={commentFilterInputs.commentContent}
                  onChange={(e) =>
                    handleCommentInputChange({ commentContent: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCommentSearch();
                  }}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='postId'>
                  {t('Pages.Admin.AdminReports.Filters.PostID')}
                </Label>
                <Input
                  id='postId'
                  placeholder={t(
                    'Pages.Admin.AdminReports.Filters.PostIDPlaceholder'
                  )}
                  value={commentFilterInputs.postId}
                  onChange={(e) =>
                    handleCommentInputChange({ postId: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCommentSearch();
                  }}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='authorUsername'>
                  {t('Pages.Admin.AdminReports.Filters.AuthorUsername')}
                </Label>
                <Input
                  id='authorUsername'
                  placeholder={t(
                    'Pages.Admin.AdminReports.Filters.AuthorUsernamePlaceholder'
                  )}
                  value={commentFilterInputs.authorUsername}
                  onChange={(e) =>
                    handleCommentInputChange({ authorUsername: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCommentSearch();
                  }}
                />
              </div>
              <div className='flex flex-col justify-end gap-2'>
                <div className='flex gap-2'>
                  <Button onClick={handleCommentSearch}>
                    {t('Pages.Admin.AdminReports.Filters.Search')}
                  </Button>
                  <Button variant='outline' onClick={handleCommentReset}>
                    {t('Pages.Admin.AdminReports.Filters.Reset')}
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {commentReportsQuery.isLoading ? (
              <Skeleton className='h-32 w-full' />
            ) : (
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors min-w-[60px]'
                        onClick={() => handleCommentSort('id')}
                      >
                        <div className='flex items-center gap-1'>
                          {t('Pages.Admin.AdminReports.Comments.Table.ID')}
                          {getCommentSortIcon('id')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors min-w-[250px]'
                        onClick={() => handleCommentSort('commentContent')}
                      >
                        <div className='flex items-center gap-1'>
                          {t(
                            'Pages.Admin.AdminReports.Comments.Table.CommentText'
                          )}
                          {getCommentSortIcon('commentContent')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors min-w-[120px]'
                        onClick={() => handleCommentSort('authorUsername')}
                      >
                        <div className='flex items-center gap-1'>
                          {t(
                            'Pages.Admin.AdminReports.Comments.Table.CommentAuthor'
                          )}
                          {getCommentSortIcon('authorUsername')}
                        </div>
                      </TableHead>
                      <TableHead>
                        {t('Pages.Admin.AdminReports.Comments.Table.Reporter')}
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors min-w-[150px]'
                        onClick={() => handleCommentSort('reason')}
                      >
                        <div className='flex items-center gap-1'>
                          {t('Pages.Admin.AdminReports.Comments.Table.Reason')}
                          {getCommentSortIcon('reason')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors min-w-[140px]'
                        onClick={() => handleCommentSort('createdAt')}
                      >
                        <div className='flex items-center gap-1'>
                          {t('Pages.Admin.AdminReports.Comments.Table.Date')}
                          {getCommentSortIcon('createdAt')}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commentReportsQuery.data?.reports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6}>
                          {t('Pages.Admin.AdminReports.NoRecords')}
                        </TableCell>
                      </TableRow>
                    ) : (
                      commentReportsQuery.data?.reports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className='font-mono text-sm'>
                            {report.id}
                          </TableCell>
                          <TableCell className='max-w-xs truncate'>
                            {report.comment.text}
                          </TableCell>
                          <TableCell>{report.comment.user.username}</TableCell>
                          <TableCell>{report.user.username}</TableCell>
                          <TableCell>{report.reason}</TableCell>
                          <TableCell>
                            {formatLocalizedDateTime(
                              new Date(report.createdAt)
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                {commentReportsQuery.data && (
                  <TablePagination
                    currentPage={commentPage}
                    totalPages={commentReportsQuery.data.pages}
                    pageSize={commentPageSize}
                    totalItems={commentReportsQuery.data.total}
                    onPageChange={setCommentPage}
                    onPageSizeChange={(size) => {
                      setCommentPageSize(size);
                      setCommentPage(1);
                    }}
                  />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
