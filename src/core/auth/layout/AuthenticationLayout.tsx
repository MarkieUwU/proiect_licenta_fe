import { Outlet } from '@tanstack/react-router';

const AuthenticationLayout: React.FC = () => {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
};

export default AuthenticationLayout;
