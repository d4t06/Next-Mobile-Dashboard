import { createContext, useContext, useState, type ReactNode } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  return { categories, isFetching, setCategories, setIsFetching };
};

type ContextType = ReturnType<typeof useCategory>;

const context = createContext<ContextType | null>(null);

export default function CategoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <context.Provider value={useCategory()}>{children}</context.Provider>
  );
}

export function useCategoryContext() {
  const ct = useContext(context);
  if (!ct) throw new Error("productProvider not provided");

  return ct;
}
