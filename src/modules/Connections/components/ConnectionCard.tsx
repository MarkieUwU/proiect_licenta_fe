import { getInitials } from "@/core/utils/utils";
import { AvatarComponent } from "@/layout/components/Avatar";
import { User } from "@/modules/Profile/models/user.models";
import { Card, CardContent } from "@/shared/ui/card";
import { useNavigate } from "@tanstack/react-router";

interface ConnectionCardProps {
  user: User;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ user }) => {
  const initials = getInitials(user.username);
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate({ to: `/${user.username}/profile` });
  }

  return (
    <Card className='p-5 w-[400px] h-fit hover:bg-gray-50 cursor-pointer' onClick={navigateToProfile}>
      <CardContent className='p-0'>
        <div className='flex gap-5'>
          <div className='text-3xl'>
            <AvatarComponent initials={initials} size={110}></AvatarComponent>
          </div>
          <div className='flex flex-col gap-4 justify-center'>
            <span className='font-bold text-3xl'>{user.fullName}</span>
            <div className='flex gap-4 font-bold'>
              <span className='border-2 px-2 py-1 border-black shadow bg-slate-100 rounded-md'>
                {`${user.following.length} Connections`}
              </span>
              <span className='border-2 px-2 py-1 border-black shadow bg-slate-100 rounded-md'>
                {`${user.posts.length} Posts`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ConnectionCard;
