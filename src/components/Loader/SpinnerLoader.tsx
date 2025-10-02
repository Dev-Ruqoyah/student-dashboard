import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className=" container flex flex-column align-center justify-center h-screen">
      <Loader2 className="animate-spin" size={48} />
      <span className="mt-3 fs-5">Loading your dashboard...</span>
    </div>
  );
};

export default LoadingScreen;
