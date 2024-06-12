type UserProps = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};
export const User = ({ createdAt, email, id, name }: UserProps) => {
  return (
    <div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{email}</div>
      <div>{createdAt}</div>
    </div>
  );
};
