import { useUserApi } from "../api/user";
import { User } from "../components/User";

export const Settings = () => {
  const { data } = useUserApi();

  if (!data) return null;

  return (
    <div>
      {data.map((user) => (
        <>
          <div
            style={{
              marginBottom: "16px",
              padding: "12px 24px",
              border: "1px solid",
            }}
          >
            <User {...user} />
          </div>
        </>
      ))}
    </div>
  );
};
