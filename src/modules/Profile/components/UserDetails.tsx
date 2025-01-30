import { useTranslation } from 'react-i18next';
import { UserProfile } from '../models/user.models';
import { Gender } from '../models/gender.enum';

interface UserDetailsProps {
  user: UserProfile;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  const { t } = useTranslation('translation');

  return (
    <div>
      <table className='text-md font-semibold'>
        <tbody>
          <tr>
            <td className='text-gray-500 text-right p-1'>
              {t('Pages.ProfilePage.UserDetails.Username')}
            </td>
            <td className='ps-4'>{user.username}</td>
          </tr>
          <tr>
            <td className='text-gray-500 text-right p-1'>
              {t('Pages.ProfilePage.UserDetails.Email')}
            </td>
            <td className='ps-4'>{user.email}</td>
          </tr>
          {!!user.gender?.length && (
            <tr>
              <td className='text-gray-500 text-right p-1'>
                {t('Pages.ProfilePage.UserDetails.Gender')}
              </td>
              <td className='ps-4'>
                {user.gender === Gender.male
                  ? t('Enums.Gender.Male')
                  : t('Enums.Gender.Female')}
            </td>
            </tr>
          )}
          {!!user.bio && (
            <tr>
              <td className='text-gray-500 text-right p-1'>
                {t('Pages.ProfilePage.UserDetails.Bio')}
              </td>
              <td className='ps-4'>{user.bio}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
