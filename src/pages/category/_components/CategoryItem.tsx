import {
  AddItemModal,
  ConfirmModal,
  ItemRightCta,
  Modal,
  type ModalRef,
} from "@/share/components";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import useCategoryAction from "../_hooks/useCategoryAction";
import { generateId } from "@/utils/appHelper";

type Modal = "edit" | "delete";

type Props = {
  category: Category;
  index: number;
};

export default function CategoryItem({ category, index }: Props) {
  const modalRef = useRef<ModalRef | null>(null);
  const [modal, setModal] = useState<Modal | "">("");

  const { actions, isFetching } = useCategoryAction({ modalRef });

  const openModal = (m: Modal) => {
    setModal(m);
    modalRef.current?.open();
  };

  return (
    <ItemRightCta className="ml-2 mt-2">
      <span>{category.category_name}</span>

      <div>
        <button onClick={() => openModal("edit")}>
          <PencilIcon className="w-5" />
        </button>
        <button onClick={() => openModal("delete")}>
          <TrashIcon className="w-5" />
        </button>
      </div>

      <Modal ref={modalRef}>
        {modal === "delete" && (
          <ConfirmModal
            loading={isFetching}
            closeModal={() => modalRef.current?.close()}
            submit={() => actions({ type: "Delete", id: category.id })}
          />
        )}
        {modal === "edit" && (
          <AddItemModal
            variant="input"
            title="Edit category"
            loading={isFetching}
            initValue={category.category_name}
            closeModal={() => modalRef.current?.close()}
            submit={(v) =>
              actions({
                type: "Edit",
                category: {
                  category_name: v,
                  category_name_ascii: generateId(v),
                },
                id: category.id,
                index: index,
              })
            }
          />
        )}
      </Modal>
    </ItemRightCta>
  );
}
