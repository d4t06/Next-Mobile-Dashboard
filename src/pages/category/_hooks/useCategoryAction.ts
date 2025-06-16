import type { ModalRef } from "@/share/components";
import useFetch from "@/share/hooks/useFetch";
import { useCategoryContext } from "@/stores/CategoryContext";
import { useToastContext } from "@/stores/ToastContext";
import { generateId } from "@/utils/appHelper";
import { useState, type RefObject } from "react";

const CATEGORY_URL = "/categories";

type Props = {
  modalRef: RefObject<ModalRef | null>;
};

export default function useCategoryAction({ modalRef }: Props) {
  const { categories, setCategories } = useCategoryContext();
  const { showToast } = useToastContext();

  const $fetch = useFetch();

  const [isFetching, setIsFetching] = useState(false);

  // hooks

  type Add = {
    type: "Add";
    name: string;
  };

  type Edit = {
    type: "Edit";
    category: Partial<CategorySchema>;
    id: number;
    index: number;
  };

  type Delete = {
    type: "Delete";
    id: number;
  };

  type Props = Add | Edit | Delete;

  const actions = async ({ ...props }: Props) => {
    try {
      setIsFetching(true);

      switch (props.type) {
        case "Add":
          const categorySchema: CategorySchema = {
            attribute_order: "",
            category_name: props.name,
            category_name_ascii: generateId(props.name),
          };
          const res = await $fetch.post<CategorySchema & { id: number }>(
            CATEGORY_URL,
            categorySchema,
          );

          setCategories((prev) => [
            ...prev,
            { ...res.data, brands: [], attributes: [] },
          ]);

          break;
        case "Edit": {
          const { category, id } = props;

          await $fetch.put(`${CATEGORY_URL}/${id}`, category);

          const newCategories = [...categories];

          Object.assign(newCategories[props.index], category);

          setCategories(newCategories);

          break;
        }

        case "Delete": {
          await $fetch.delete(`${CATEGORY_URL}/${props.id}`);

          const newCategories = categories.filter((c) => c.id !== props.id);

          setCategories(newCategories);

          break;
        }
      }

      showToast(true, `${props.type} ok`);
    } catch (error: any) {
      if (error.response.status === 409) {
        showToast(false, "Category name had taken");
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
