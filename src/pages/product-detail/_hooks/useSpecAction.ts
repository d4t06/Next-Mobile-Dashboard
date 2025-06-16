import { useState, type RefObject } from "react";
import { useProductDetailContext } from "../_components/ProductContext";
import type { ModalRef } from "@/share/components";
import useFetch from "@/share/hooks/useFetch";
import { useToastContext } from "@/stores/ToastContext";

type Props = {
  modalRef: RefObject<ModalRef | null>;
};

const END_POINT = "/product-attributes";

export default function useSpectAction({ modalRef }: Props) {
  const { product, setProduct } = useProductDetailContext();

  const [isFetching, setIsFetching] = useState(false);

  const $fetch = useFetch();
  const { showToast } = useToastContext();

  type AddAttribute = {
    variant: "Add";
    productAttribute: ProductAttributeSchema;
  };

  type EditAttribute = {
    variant: "Edit";
    productAttribute: Partial<ProductAttributeSchema>;
    id: number;
  };

  const action = async (props: AddAttribute | EditAttribute) => {
    try {
      if (!product) return;
      setIsFetching(true);

      switch (props.variant) {
        case "Add":
          const res = await $fetch.post<ProductAttribute>(
            `${END_POINT}`,
            props.productAttribute,
          );

          const newAttributes = [...product.attributes, res.data];

          setProduct(() => ({ ...product, attributes: newAttributes }));

          break;

        case "Edit": {
          await $fetch.put(`${END_POINT}/${props.id}`, props.productAttribute);

          const newAttributes = [...product.attributes];

          const index = newAttributes.findIndex((att) => att.id === props.id);

          if (index !== -1)
            Object.assign(newAttributes[index], props.productAttribute);

          setProduct(() => ({ ...product, attributes: newAttributes }));

          break;
        }
      }

      showToast(true, `${props.variant} attribute successful`);
    } catch (error) {
      showToast(false);
    } finally {
      setIsFetching(false);
      modalRef.current?.close();
    }
  };

  return { action, isFetching };
}
