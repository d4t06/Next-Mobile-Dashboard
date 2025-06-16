import { createContext, useContext, useState, type ReactNode } from "react";

const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (success: boolean, message?: string) => {
    const MSG = message
      ? message
      : success
        ? "Successful"
        : "Something went wrong";

    setToasts((prev) => [
      ...prev,
      {
        title: success ? "success" : "error",
        id: Date.now() + "",
        desc: MSG,
      },
    ]);
  };

  return { toasts, setToasts, showToast };
};

type ContextType = ReturnType<typeof useToast>;

const context = createContext<ContextType | null>(null);

export default function ToastProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <context.Provider value={useToast()}>{children}</context.Provider>;
}

export function useToastContext() {
  const ct = useContext(context);
  if (!ct) throw new Error("ToastProvider not provided");

  return ct;
}
