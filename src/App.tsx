import AppRouter from "./router/route";
import "./App.css";
import { AuthProvider } from "./contexts/useAuthContext";
import { ToastContainer } from "react-toastify";
import { LoadingProvider } from "./contexts/useLoadingContext";
const App = () => {
  return (
    <>
      <LoadingProvider>
        <AuthProvider>
        <AppRouter />
      </AuthProvider>
      </LoadingProvider>
      <ToastContainer />
    </>
  );
};

export default App;
