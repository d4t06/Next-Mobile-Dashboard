import { useCategoryContext } from "@/stores/CategoryContext";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const useCurrentCategory = () => {
  const { categories } = useCategoryContext();

  const [currentIndex, setCurrentIndex] = useState<number>();

  const currentCategory = useMemo(
    () => (currentIndex !== undefined ? categories[currentIndex] : undefined),

    [categories, currentIndex],
  );

  return { currentCategory, currentIndex, setCurrentIndex };
};
type ContextType = ReturnType<typeof useCurrentCategory>;

const context = createContext<ContextType | null>(null);

export default function CurrentCategoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <context.Provider value={useCurrentCategory()}>{children}</context.Provider>
  );
}

export function useCurrentCategoryContext() {
  const ct = useContext(context);
  if (!ct) throw new Error("CurrentCategoryProvider not provided");

  return ct;
}
