import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from 'date-fns'
import { AvatarComponent } from "@/layout/components/Avatar"
import { getInitials } from "@/core/utils/utils"
import { UserStats, PostStats } from "@/core/admin/models/dashboard.models"

interface RecentActivityProps {
  recentUsers?: UserStats[]
  recentPosts?: PostStats[]
  title: string
}

export const RecentActivity = ({ 
  recentUsers, 
  recentPosts, 
  title 
}: RecentActivityProps) => {
  const items = recentUsers || recentPosts

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {items?.map((item) => {
            const isUser = 'email' in item
            const username = isUser ? item.username : item.user.username
            const fullName = isUser ? item.fullName : item.user.fullName
            const content = isUser ? item.email : item.content
            const profileImage = isUser ? item.profileImage : item.user.profileImage

            return (
              <div key={item.id} className='flex items-center'>
                <AvatarComponent
                  className='h-9 w-9'
                  image={profileImage}
                  initials={getInitials(username)}
                />
                <div className='ml-4 space-y-1'>
                  <p className='text-sm font-medium leading-none'>{fullName}</p>
                  <p className='text-sm text-muted-foreground pe-4'>
                    {content}
                  </p>
                </div>
                <div className='ml-auto font-medium text-center'>
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  )
} 