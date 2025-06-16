import { useEffect, useState } from "react";
import { useProductContext } from "../../../stores/ProductContext";
import useFetch from "../../../share/hooks/useFetch";

const tabs = ["All", "Result"] as const;

type Tab = (typeof tabs)[number];

export default function useProduct() {
  const { setProducts, shoudlFetchProducts, setPage, setIsFetching } =
    useProductContext();

  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [value, setValue] = useState("");
  const [tab, setTab] = useState<Tab>("All");
  // const [isFetching, setIsFetching] = useState(true);

  const $fetch = useFetch();

  type Search = {
    variant: "search";
  };

  type GetProducts = {
    variant: "get-products";
    page: number;
  };

  const handleSubmit = () => fetchProduct({ variant: "search" });

  const fetchProduct = async (props: Search | GetProducts) => {
    try {
      setIsFetching(true);

      switch (props.variant) {
        case "search": {
          const res = await $fetch.get<Product[]>(
            `/products/search?q=${value}`,
          );

          setSearchResult(res.data);
          setTab("Result");
          break;
        }
        case "get-products": {
          const res = await $fetch.get<{ products: Product[] }>(
            `/products?page=${props.page}`,
          );

          setProducts((prev) => [...prev, ...res.data.products]);
          setPage(props.page);
          break;
        }
      }
    } catch (err) {
      console.log({ message: err });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (tab !== "All") return;

    if (shoudlFetchProducts.current) {
      shoudlFetchProducts.current = false;
      fetchProduct({ variant: "get-products", page: 1 });
    }
  }, []);

  return {
    searchResult,
    value,
    setValue,
    tabs,
    tab,
    handleSubmit,
    setTab,
    fetchProduct,
  };
}
