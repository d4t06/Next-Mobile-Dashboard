import { createContext, useContext, useRef, useState, type ReactNode } from "react";

const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);

  const shoudlFetchProducts = useRef(true)

  return { products, isFetching, setProducts, shoudlFetchProducts, setIsFetching, page, setPage };
};

type ContextType = ReturnType<typeof useProduct>;

const context = createContext<ContextType | null>(null);

export default function ProductProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <context.Provider value={useProduct()}>{children}</context.Provider>;
}

export function useProductContext() {
  const ct = useContext(context);
  if (!ct) throw new Error("productProvider not provided");

  return ct;
}
