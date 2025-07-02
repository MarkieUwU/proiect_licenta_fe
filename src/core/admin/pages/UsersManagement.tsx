import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUsers, updateUserRole } from "@/core/admin/apis/admin.api"
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
import { AdminUser } from "../models/user.models"
import { toast } from "sonner"
import { LoadingPage } from "@/core/pages/LoadingPage"
import { TablePagination } from "@/components/ui/table-pagination"

export const UsersManagement = () => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', page, pageSize, search],
    queryFn: () => getUsers({ page, limit: pageSize, search })
  });

  const roleUpdateMutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-users', page, pageSize, search],
      });
      toast.success("User role updated successfully");
    }
  });

  const handleRoleUpdate = async (userId: number, role: Role) => {
    roleUpdateMutation.mutate({ userId, role });
  };

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleReset = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
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
        <h1 className='text-3xl font-bold'>Users Management</h1>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Search users...'
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            className='w-[250px]'
          />
          <Button onClick={handleSearch} variant='default'>Search</Button>
          <Button onClick={handleReset} variant='outline'>Reset</Button>
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Posts</TableHead>
              <TableHead>Connections</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user._count.posts}</TableCell>
                <TableCell>
                  {user._count.follower + user._count.following}
                </TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        onClick={() => setSelectedUser(user)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                      </DialogHeader>
                      <div className='space-y-4 py-4'>
                        <div className='space-y-2'>
                          <label>Role</label>
                          <Select
                            defaultValue={user.role}
                            onValueChange={(value) =>
                              handleRoleUpdate(user.id, value as Role)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder='Select role' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={Role.USER}>User</SelectItem>
                              <SelectItem value={Role.ADMIN}>Admin</SelectItem>
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