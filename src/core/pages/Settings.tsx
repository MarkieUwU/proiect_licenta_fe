import { useGetUsersList } from './ProfilePage/hooks/user.hooks';

export const Settings = () => {
  const { data } = useGetUsersList();

  if (!data) return null;

  return (
    <div>
      {data.map(() => (
        <>
          <div
            style={{
              marginBottom: '16px',
              padding: '12px 24px',
              border: '1px solid',
            }}
          ></div>
        </>
      ))}
    </div>
  );
};
