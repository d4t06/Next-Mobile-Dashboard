import useFetch from "@/share/hooks/useFetch";
import { useProductContext } from "@/stores/ProductContext";
import { useToastContext } from "@/stores/ToastContext";
import { useState } from "react";

type Props = {
  closeModal?: () => void;
};

export default function useAddProduct({ closeModal }: Props) {
  //    hooks
  const { setProducts } = useProductContext();
  const { showToast } = useToastContext();

  const $fetch = useFetch();

  const [isFetching, setIsFetching] = useState(false);

  const PRODUCT_URL = "/products";

  type Add = {
    variant: "Add";
    product: ProductSchema;
  };

  type Edit = {
    variant: "Edit";
    product: Partial<ProductSchema>;
    id: number;
    callback?: () => void;
  };

  const addProduct = async (props: Add | Edit) => {
    try {
      setIsFetching(true);

      switch (props.variant) {
        case "Add": {
          const res = await $fetch.post<Product>(
            `${PRODUCT_URL}`,
            props.product,
          );

          setProducts((prev) => [res.data, ...prev]);

          break;
        }
        case "Edit": {
          const { product, id } = props;
          await $fetch.put(`${PRODUCT_URL}/${id}`, product);

          props.callback && props.callback();

          break;
        }
      }

      showToast(true, `${props.variant} product successful`);

      closeModal && closeModal();
    } catch (error: any) {
      if (error.response.status === 409) {
        showToast(false, "Product name had taken");
      } else showToast(false);
    } finally {
      setIsFetching(false);
    }
  };

  return { isFetching, addProduct };
}
