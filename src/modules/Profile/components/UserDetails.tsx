import { UserProfile } from '../models/user.models';

interface UserDetailsProps {
  user: UserProfile;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <div>
      <table className="text-md font-semibold">
        <tbody>
          <tr>
            <td className="text-gray-500 text-right p-1">Username</td>
            <td className="ps-4">{user.username}</td>
          </tr>
          <tr>
            <td className="text-gray-500 text-right p-1">Email</td>
            <td className="ps-4">{user.email}</td>
          </tr>
          {user.bio && (
            <tr>
              <td className="text-gray-500 text-right p-1">Bio</td>
              <td className="ps-4">{user.bio}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
