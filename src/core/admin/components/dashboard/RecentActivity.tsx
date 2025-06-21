import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from 'date-fns'

interface User {
  id: number
  username: string
  fullName: string
  email: string
  createdAt: string
}

interface Post {
  id: number
  content: string
  createdAt: string
  user: {
    username: string
    fullName: string
  }
}

interface RecentActivityProps {
  recentUsers?: User[]
  recentPosts?: Post[]
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

            return (
              <div key={item.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`https://avatar.vercel.sh/${username}`} />
                  <AvatarFallback>
                    {username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {fullName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {content}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {formatDistanceToNow(new Date(item.createdAt), { 
                    addSuffix: true 
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 