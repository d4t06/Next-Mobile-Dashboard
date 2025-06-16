import { useEffect, useRef } from "react";
import useProductDetail from "../_hooks/useProductDetail";
import { Center, Loading } from "@/share/components";
import { useProductDetailContext } from "./ProductContext";
import EditProductBtn from "./EditProductBtn";
import Description from "./Description";
import DangerZone from "./DangerZone";
import SpecTable from "./SpecTable";
import NotFound from "@/share/components/NotFound";
import { useCategoryContext } from "@/stores/CategoryContext";
import EditDescriptionBtn from "./EditDescriptionBtn";

export default function Wrapper() {
  const { fetchProduct, isFetching } = useProductDetail();
  const { product } = useProductDetailContext();
  const { isFetching: getCategoriesIsFetching } = useCategoryContext();

  const ranEffect = useRef(false);

  useEffect(() => {
    if (!ranEffect.current) {
      ranEffect.current = true;
      fetchProduct();
    }
  }, []);

  return (
    <div className="py-5">
      {getCategoriesIsFetching ||
        (isFetching && (
          <Center>
            <Loading />
          </Center>
        ))}

      {!isFetching && !getCategoriesIsFetching && (
        <>
          {product ? (
            <div className="space-y-8 [&_h1]:text-xl">
              <div className="flex justify-between items-center">
                <h1>{product.product_name}</h1>

                <EditProductBtn />
              </div>

              <h1>Specification</h1>

              <SpecTable />

              <div className="flex justify-between items-center">
                <h1>Detail</h1>

                <EditDescriptionBtn />
              </div>

              <Description />

              <h1 className="text-red-500">Danger Zone</h1>

              <DangerZone />
            </div>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </div>
  );
}
