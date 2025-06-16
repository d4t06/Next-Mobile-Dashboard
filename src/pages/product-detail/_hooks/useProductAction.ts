import useFetch from "@/share/hooks/useFetch";
import { useProductContext } from "@/stores/ProductContext";
import { useToastContext } from "@/stores/ToastContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductDetailContextForce } from "../_components/ProductContext";

export default function useProductAction() {
  const { products, setProducts } = useProductContext();
  const { product, setProduct } = useProductDetailContextForce();

  const [isFetching, setIsFetching] = useState(false);

  const $fetch = useFetch();
  const { showToast } = useToastContext();
  const navigator = useNavigate();

  type Delete = {
    variant: "delete";
    id: number;
  };

  type EditDesc = {
    variant: "edit-desc";
    productId: number;
    desc: Partial<DescriptionSchema>;
    callback?: () => void;
  };

  const action = async (props: Delete | EditDesc) => {
    try {
      setIsFetching(true);

      switch (props.variant) {
        case "delete":
          await $fetch.delete(`/products/${props.id}`);

          showToast(true, "Delete product ok");

          const newProducts = products.filter((p) => p.id !== props.id);

          setProducts(newProducts);

          navigator("/");

          break;
        case "edit-desc":
          await $fetch.put(
            `/product-descriptions/${props.productId}`,
            props.desc,
          );

          const newDescription = { ...product.description };

          Object.assign(newDescription, props.desc);

          setProduct(() => ({ ...product, description: newDescription }));

          props.callback && props.callback()

          showToast(true, "Update description ok");
          break;
      }
    } catch (error) {
      showToast(false);
    } finally {
      setIsFetching(false);
    }
  };

  return { action, isFetching };
}
