import { useUserApi } from "./api/user";
import { Settings } from "./pages/Settings";

function App() {
  const { data } = useUserApi();

  if (!data) return null;

  return <Settings />;
}

export default App;
