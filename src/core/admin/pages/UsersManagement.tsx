import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUsers, updateUserRole } from "@/core/admin/apis/admin.api"
import { useTranslation } from "react-i18next"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Role } from "@/modules/Profile/models/role.enum"
import { format } from "date-fns"
import { ro } from 'date-fns/locale'
import { AdminUser } from "../models/user.models"
import { toast } from "sonner"
import { LoadingPage } from "@/core/pages/LoadingPage"
import { TablePagination } from "@/components/ui/table-pagination"
import { ArrowUp, ArrowDown } from 'lucide-react'

type SortField = 'id' | 'username' | 'fullName' | 'email' | 'role'

export const UsersManagement = () => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const queryClient = useQueryClient();

  // Get the appropriate locale for date-fns based on current language
  const getDateLocale = () => {
    return i18n.language === 'ro' ? ro : undefined // undefined defaults to English
  }

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', page, pageSize, search, sortField, sortOrder],
    queryFn: () => getUsers({ page, limit: pageSize, search, sort: sortField, order: sortOrder })
  });

  const roleUpdateMutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-users', page, pageSize, search, sortField, sortOrder],
      });
      toast.success(t("Pages.Admin.UsersManagement.Success.RoleUpdated"));
    }
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortField === 'id') {
        setSortOrder('asc');
      } else if (sortOrder === 'desc') {
        setSortField('id');
        setSortOrder('asc');
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

  const handleRoleUpdate = async (userId: number, role: Role) => {
    roleUpdateMutation.mutate({ userId, role });
  }

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1); // Reset to first page when changing page size
  };

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-3xl font-bold'>{t('Pages.Admin.UsersManagement.Title')}</h1>
        <div className='flex items-center gap-2'>
          <Input
            placeholder={t('Pages.Admin.UsersManagement.SearchPlaceholder')}
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className='max-w-sm'
          />
        </div>
      </div>

      <div className='rounded-md border shadow overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="min-w-[60px] cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('id')}
              >
                <div className='flex items-center gap-1'>
                  {t('Pages.Admin.UsersManagement.Table.ID')}
                  {getSortIcon('id')}
                </div>
              </TableHead>
              <TableHead 
                className="min-w-[120px] cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('username')}
              >
                <div className='flex items-center gap-1'>
                  {t('Pages.Admin.UsersManagement.Table.Username')}
                  {getSortIcon('username')}
                </div>
              </TableHead>
              <TableHead 
                className="min-w-[150px] cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('fullName')}
              >
                <div className='flex items-center gap-1'>
                  {t('Pages.Admin.UsersManagement.Table.FullName')}
                  {getSortIcon('fullName')}
                </div>
              </TableHead>
              <TableHead 
                className="min-w-[200px] cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('email')}
              >
                <div className='flex items-center gap-1'>
                  {t('Pages.Admin.UsersManagement.Table.Email')}
                  {getSortIcon('email')}
                </div>
              </TableHead>
              <TableHead 
                className="min-w-[80px] cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleSort('role')}
              >
                <div className='flex items-center gap-1'>
                  {t('Pages.Admin.UsersManagement.Table.Role')}
                  {getSortIcon('role')}
                </div>
              </TableHead>
              <TableHead className="min-w-[80px]">{t('Pages.Admin.UsersManagement.Table.Posts')}</TableHead>
              <TableHead className="min-w-[120px]">{t('Pages.Admin.UsersManagement.Table.Connections')}</TableHead>
              <TableHead className="min-w-[120px]">{t('Pages.Admin.UsersManagement.Table.Joined')}</TableHead>
              <TableHead className="min-w-[100px]">{t('Pages.Admin.UsersManagement.Table.Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{t(`Enums.Role.${user.role}`)}</TableCell>
                <TableCell>{user._count.posts}</TableCell>
                <TableCell>
                  {user._count.follower + user._count.following}
                </TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), 'MMM d, yyyy', {
                    locale: getDateLocale()
                  })}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        onClick={() => setSelectedUser(user)}
                      >
                        {t('Pages.Admin.UsersManagement.Actions.Edit')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t('Pages.Admin.UsersManagement.Dialog.EditUser')}</DialogTitle>
                      </DialogHeader>
                      <div className='space-y-4 py-4'>
                        <div className='space-y-2'>
                          <label>{t('Pages.Admin.UsersManagement.EditUserDialog.Role')}</label>
                          <Select
                            defaultValue={user.role}
                            onValueChange={(value) =>
                              handleRoleUpdate(user.id, value as Role)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('Pages.Admin.UsersManagement.EditUserDialog.SelectRole')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={Role.USER}>{t('Enums.Role.USER')}</SelectItem>
                              <SelectItem value={Role.ADMIN}>{t('Enums.Role.ADMIN')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {data && (
          <TablePagination
            currentPage={page}
            totalPages={data.pages}
            pageSize={pageSize}
            totalItems={data.total}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </div>
  );
} 