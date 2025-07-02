import { useQuery } from '@tanstack/react-query';
import { getAllPostReports, getAllCommentReports } from '../apis/admin.api';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { TablePagination } from '@/components/ui/table-pagination';
import { Button } from '@/components/ui/button';

type PostReportSortField = 'id' | 'postTitle' | 'postAuthor' | 'reporter' | 'reason' | 'createdAt';
type CommentReportSortField = 'id' | 'commentText' | 'commentAuthor' | 'reporter' | 'reason' | 'createdAt';

export default function AdminReports() {
  const [postFilters, setPostFilters] = useState({
    postId: '',
    postTitle: '',
    authorId: '',
    authorUsername: ''
  });

  const [commentFilters, setCommentFilters] = useState({
    commentId: '',
    commentContent: '',
    authorId: '',
    authorUsername: ''
  });

  const [postSortField, setPostSortField] = useState<PostReportSortField>('createdAt');
  const [postSortOrder, setPostSortOrder] = useState<'asc' | 'desc'>('desc');

  const [commentSortField, setCommentSortField] = useState<CommentReportSortField>('createdAt');
  const [commentSortOrder, setCommentSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination state for post reports
  const [postPage, setPostPage] = useState(1);
  const [postPageSize, setPostPageSize] = useState(20);

  // Pagination state for comment reports
  const [commentPage, setCommentPage] = useState(1);
  const [commentPageSize, setCommentPageSize] = useState(20);

  const postReportsQuery = useQuery({
    queryKey: ['postReports', postFilters, postSortField, postSortOrder, postPage, postPageSize],
    queryFn: () => getAllPostReports({
      ...(postFilters.postId && { postId: Number(postFilters.postId) }),
      ...(postFilters.postTitle && { postTitle: postFilters.postTitle }),
      ...(postFilters.authorId && { authorId: Number(postFilters.authorId) }),
      ...(postFilters.authorUsername && { authorUsername: postFilters.authorUsername }),
      sort: postSortField,
      order: postSortOrder,
      page: postPage,
      limit: postPageSize
    }),
  });

  const commentReportsQuery = useQuery({
    queryKey: ['commentReports', commentFilters, commentSortField, commentSortOrder, commentPage, commentPageSize],
    queryFn: () => getAllCommentReports({
      ...(commentFilters.commentId && { commentId: Number(commentFilters.commentId) }),
      ...(commentFilters.commentContent && { commentContent: commentFilters.commentContent }),
      ...(commentFilters.authorId && { authorId: Number(commentFilters.authorId) }),
      ...(commentFilters.authorUsername && { authorUsername: commentFilters.authorUsername }),
      sort: commentSortField,
      order: commentSortOrder,
      page: commentPage,
      limit: commentPageSize
    }),
  });

  const handlePostSort = (field: PostReportSortField) => {
    if (postSortField === field) {
      if (postSortOrder === 'asc') {
        setPostSortOrder('desc');
      } else if (postSortField === 'createdAt') {
        setPostSortOrder('asc');
      } else if (postSortOrder === 'desc') {
        setPostSortField('createdAt');
        setPostSortOrder('desc');
      }
    } else {
      setPostSortField(field);
      setPostSortOrder('asc');
    }
  };

  const handleCommentSort = (field: CommentReportSortField) => {
    if (commentSortField === field) {
      if (commentSortOrder === 'asc') {
        setCommentSortOrder('desc');
      } else if (commentSortField === 'createdAt') {
        setCommentSortOrder('asc');
      } else if (commentSortOrder === 'desc') {
        setCommentSortField('createdAt');
        setCommentSortOrder('desc');
      }
    } else {
      setCommentSortField(field);
      setCommentSortOrder('asc');
    }
  };

  const getPostSortIcon = (field: PostReportSortField) => {
    if (postSortField !== field) {
      return null;
    }
    return postSortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const getCommentSortIcon = (field: CommentReportSortField) => {
    if (commentSortField !== field) {
      return null;
    }
    return commentSortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  // Reset pagination when filters change
  const handlePostFilterChange = (updates: Partial<typeof postFilters>) => {
    setPostFilters(prev => ({ ...prev, ...updates }));
    setPostPage(1);
  };

  const handleCommentFilterChange = (updates: Partial<typeof commentFilters>) => {
    setCommentFilters(prev => ({ ...prev, ...updates }));
    setCommentPage(1);
  };

  // Add local state for filter inputs
  const [postFilterInputs, setPostFilterInputs] = useState(postFilters);
  const [commentFilterInputs, setCommentFilterInputs] = useState(commentFilters);

  // Search/Reset handlers for post reports
  const handlePostInputChange = (updates: Partial<typeof postFilters>) => {
    setPostFilterInputs(prev => ({ ...prev, ...updates }));
  };
  const handlePostSearch = () => {
    setPostFilters(postFilterInputs);
    setPostPage(1);
  };
  const handlePostReset = () => {
    setPostFilterInputs({ postId: '', postTitle: '', authorId: '', authorUsername: '' });
    setPostFilters({ postId: '', postTitle: '', authorId: '', authorUsername: '' });
    setPostSortField('createdAt');
    setPostSortOrder('desc');
    setPostPage(1);
  };

  // Search/Reset handlers for comment reports
  const handleCommentInputChange = (updates: Partial<typeof commentFilters>) => {
    setCommentFilterInputs(prev => ({ ...prev, ...updates }));
  };
  const handleCommentSearch = () => {
    setCommentFilters(commentFilterInputs);
    setCommentPage(1);
  };
  const handleCommentReset = () => {
    setCommentFilterInputs({ commentId: '', commentContent: '', authorId: '', authorUsername: '' });
    setCommentFilters({ commentId: '', commentContent: '', authorId: '', authorUsername: '' });
    setCommentSortField('createdAt');
    setCommentSortOrder('desc');
    setCommentPage(1);
  };

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-xl font-bold ms-2'>Post Reports</h1>
        <Card>
          <CardHeader>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='postId'>Post ID</Label>
                <Input
                  id='postId'
                  placeholder='Enter post ID'
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
                <Label htmlFor='postTitle'>Post Title</Label>
                <Input
                  id='postTitle'
                  placeholder='Enter post title'
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
                <Label htmlFor='authorId'>Author ID</Label>
                <Input
                  id='authorId'
                  placeholder='Enter author ID'
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
                <Label htmlFor='authorUsername'>Author Username</Label>
                <Input
                  id='authorUsername'
                  placeholder='Enter author username'
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
                  <Button onClick={handlePostSearch}>Search</Button>
                  <Button variant='outline' onClick={handlePostReset}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {postReportsQuery.isLoading ? (
              <Skeleton className='h-32 w-full' />
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={() => handlePostSort('id')}
                      >
                        <div className='flex items-center gap-1'>
                          ID
                          {getPostSortIcon('id')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={() => handlePostSort('postTitle')}
                      >
                        <div className='flex items-center gap-1'>
                          Post
                          {getPostSortIcon('postTitle')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={() => handlePostSort('postAuthor')}
                      >
                        <div className='flex items-center gap-1'>
                          Post Author
                          {getPostSortIcon('postAuthor')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={() => handlePostSort('reporter')}
                      >
                        <div className='flex items-center gap-1'>
                          Reporter
                          {getPostSortIcon('reporter')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={() => handlePostSort('reason')}
                      >
                        <div className='flex items-center gap-1'>
                          Reason
                          {getPostSortIcon('reason')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={() => handlePostSort('createdAt')}
                      >
                        <div className='flex items-center gap-1'>
                          Date
                          {getPostSortIcon('createdAt')}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {postReportsQuery.data?.reports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6}>No reports found.</TableCell>
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
                            {new Date(report.createdAt).toLocaleString()}
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
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col gap-4'>
        <h1 className='text-xl font-bold ms-2'>Comment Reports</h1>
        <Card>
          <CardHeader>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='commentId'>Comment ID</Label>
                <Input
                  id='commentId'
                  placeholder='Enter comment ID'
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
                <Label htmlFor='commentContent'>Comment Content</Label>
                <Input
                  id='commentContent'
                  placeholder='Enter comment content'
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
                <Label htmlFor='authorId'>Author ID</Label>
                <Input
                  id='authorId'
                  placeholder='Enter author ID'
                  value={commentFilterInputs.authorId}
                  onChange={(e) =>
                    handleCommentInputChange({ authorId: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCommentSearch();
                  }}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='authorUsername'>Author Username</Label>
                <Input
                  id='authorUsername'
                  placeholder='Enter author username'
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
                  <Button onClick={handleCommentSearch}>Search</Button>
                  <Button variant='outline' onClick={handleCommentReset}>
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {commentReportsQuery.isLoading ? (
              <Skeleton className='h-32 w-full' />
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={() => handleCommentSort('id')}
                      >
                        <div className='flex items-center gap-1'>
                          ID
                          {getCommentSortIcon('id')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={() => handleCommentSort('commentText')}
                      >
                        <div className='flex items-center gap-1'>
                          Comment
                          {getCommentSortIcon('commentText')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={() => handleCommentSort('commentAuthor')}
                      >
                        <div className='flex items-center gap-1'>
                          Comment Author
                          {getCommentSortIcon('commentAuthor')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={() => handleCommentSort('reporter')}
                      >
                        <div className='flex items-center gap-1'>
                          Reporter
                          {getCommentSortIcon('reporter')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={() => handleCommentSort('reason')}
                      >
                        <div className='flex items-center gap-1'>
                          Reason
                          {getCommentSortIcon('reason')}
                        </div>
                      </TableHead>
                      <TableHead
                        className='cursor-pointer hover:bg-muted/50 transition-colors'
                        onClick={() => handleCommentSort('createdAt')}
                      >
                        <div className='flex items-center gap-1'>
                          Date
                          {getCommentSortIcon('createdAt')}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commentReportsQuery.data?.reports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6}>No reports found.</TableCell>
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
                            {new Date(report.createdAt).toLocaleString()}
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
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}