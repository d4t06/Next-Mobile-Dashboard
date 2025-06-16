import { useMemo } from "react";
import {
  Button,
  Loading,
  ProductItem,
  SearchBar,
  Tab,
} from "../../share/components";
import { useProductContext } from "../../stores/ProductContext";
import useProduct from "./_hooks/useProduct";
import { Link } from "react-router-dom";
import AddProductButton from "./_components/AddProductBtn";

export default function ProductPage() {
  const { isFetching, products, page, setPage } = useProductContext();

  const { searchResult, fetchProduct, tab, setTab, tabs, ...rest } =
    useProduct();

  const _products = useMemo(
    () => (tab === "All" ? products : searchResult),
    [tab, searchResult, products],
  );

  const handleGetMore = () => {
    setPage(page + 1);
    fetchProduct({ variant: "get-products", page: page + 1 });
  };

  return (
    <div className="py-5">
      <div className="flex justify-between">
        <SearchBar {...rest} />

        <AddProductButton />
      </div>

      <div className={`mt-5 ${tab === "All" ? "disabled" : ""}`}>
        <Tab
          tabs={tabs}
          tab={tab}
          setTab={(t) => setTab(t)}
          render={(t) => t}
        />
      </div>

      {!!_products.length && (
        <div className="mt-5">
          {_products.map((p, index) => (
            <Link to={`/product/${p.id}`} key={index}>
              <ProductItem product={p} />
            </Link>
          ))}
        </div>
      )}

      {isFetching && <Loading />}

      {!isFetching && (
        <p className="text-center">
          <Button colors={"second"} onClick={handleGetMore}>
            Get more
          </Button>
        </p>
      )}
    </div>
  );
}
