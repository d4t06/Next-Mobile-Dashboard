import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRefreshToken } from "../share/hooks/useFetch";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const updateUserData = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  return { user, setUser, loading, setLoading, updateUserData };
};

type ContextType = ReturnType<typeof useAuth>;

const Context = createContext<ContextType | null>(null);

export function useAuthContext() {
  const ct = useContext(Context);
  if (!ct) throw new Error("auth context not Provided");

  return ct;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <Context.Provider value={useAuth()}>
      <PersitAuth>{children}</PersitAuth>
    </Context.Provider>
  );
}

function PersitAuth({ children }: { children: ReactNode }) {
  const ranEffect = useRef(false);

  const refresh = useRefreshToken();

  useEffect(() => {
    if (!ranEffect.current) {
      ranEffect.current = true;
      refresh();
    }
  }, []);

  return children;
}
