import { createContext, useContext, useState, type ReactNode } from "react";

const useProduct = () => {
  const [product, setProduct] = useState<Product>();

  return { product, setProduct };
};
type ContextType = ReturnType<typeof useProduct>;

const context = createContext<ContextType | null>(null);

export default function ProductDetailProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <context.Provider value={useProduct()}>{children}</context.Provider>;
}

export function useProductDetailContext() {
  const ct = useContext(context);
  if (!ct) throw new Error("productProvider not provided");

  return ct;
}

export function useProductDetailContextForce() {
  const { product, ...rest } = useProductDetailContext();

  if (!product) throw new Error("product not provided");

  return { product, ...rest };
}
