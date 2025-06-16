import { useCategoryContext } from "@/stores/CategoryContext";
import { useState, type RefObject } from "react";
import { useCurrentCategoryContext } from "../_components/CurrentCategoryContext";
import { useToastContext } from "@/stores/ToastContext";
import useFetch from "@/share/hooks/useFetch";
import type { ModalRef } from "@/share/components";

const CATEGORY_URL = "/brands";

type Props = {
  modalRef: RefObject<ModalRef | null>;
};

export default function useBrandAction({ modalRef }: Props) {
  const { categories, setCategories } = useCategoryContext();
  const { currentIndex } = useCurrentCategoryContext();
  const { showToast } = useToastContext();

  const $fetch = useFetch();

  const [isFetching, setIsFetching] = useState(false);

  // hooks

  type Add = {
    type: "Add";
    brand: BrandSchema;
  };

  type Edit = {
    type: "Edit";
    brand: Partial<BrandSchema>;
    id: number;
    index: number;
  };

  type Delete = {
    type: "Delete";
    id: number;
    index: number;
  };

  type Props = Add | Edit | Delete;

  const actions = async ({ ...props }: Props) => {
    try {
      if (currentIndex === undefined) return;

      setIsFetching(true);

      const newCategories = [...categories];

      switch (props.type) {
        case "Add":
          const res = await $fetch.post<Brand>(CATEGORY_URL, props.brand);

          newCategories[currentIndex].brands = [
            ...newCategories[currentIndex].brands,
            res.data,
          ];

          break;

        case "Edit": {
          const { brand, id } = props;
          await $fetch.put(`${CATEGORY_URL}/${id}`, brand);

          Object.assign(newCategories[currentIndex].brands[props.index], brand);

          break;
        }

        case "Delete": {
          await $fetch.delete(`${CATEGORY_URL}/${props.id}`);

          newCategories[currentIndex].brands.splice(props.index, 1);

          break;
        }
      }

      showToast(true, `${props.type} ok`);

      setCategories(newCategories);
    } catch (error: any) {
      if (error.response.status === 409) {
        showToast(false, "Brand name had taken");
      } else {
        showToast(false);
      }
    } finally {
      setIsFetching(false);
      modalRef.current?.close();
    }
  };

  return { isFetching, actions };
}
