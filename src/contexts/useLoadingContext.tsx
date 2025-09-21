import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

// Define context type
interface LoadingContextProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

// Create the context
const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

// Provider
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}

      {/* Overlay loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white text-black px-6 py-4 rounded-lg shadow-lg">
            Loading...
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

// Hook
export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used inside a LoadingProvider");
  }
  return context;
};
