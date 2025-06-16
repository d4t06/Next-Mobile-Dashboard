import useAttributeAction from "../_hooks/useAttributeAction";
import {
  AddItemModal,
  ConfirmModal,
  ItemRightCta,
  Modal,
  type ModalRef,
} from "@/share/components";
import { useRef, useState } from "react";
import { generateId } from "@/utils/appHelper";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  attribute: CategoryAttribute;
  index: number | undefined;
};

export default function AttributeItem({ attribute, index }: Props) {
  type Modal = "edit" | "delete";

  const modalRef = useRef<ModalRef | null>(null);
  const [modal, setModal] = useState<Modal | "">("");

  const { actions, isFetching } = useAttributeAction({ modalRef });

  const openModal = (m: Modal) => {
    setModal(m);
    modalRef.current?.open();
  };

  return (
    <>
      <ItemRightCta className="attribute-item ml-2 mt-2" data-id={attribute.id}>
        <span>{attribute.attribute_name}</span>

        <div>
          <button onClick={() => openModal("edit")}>
            <PencilIcon className="w-5" />
          </button>
          <button onClick={() => openModal("delete")}>
            <TrashIcon className="w-5" />
          </button>
        </div>

        <Modal ref={modalRef}>
          {modal === "delete" && index !== undefined && (
            <ConfirmModal
              v-if="modal === 'delete' && index !== undefined"
              loading={isFetching}
              closeModal={() => modalRef.current?.close()}
              submit={() =>
                actions({
                  type: "Delete",
                  id: attribute.id,
                  categoryId: attribute.category_id,
                  index,
                })
              }
            />
          )}

          {modal === "edit" && index !== undefined && (
            <AddItemModal
              variant="input"
              title="Edit category"
              loading={isFetching}
              closeModal={() => modalRef.current?.close()}
              initValue={attribute.attribute_name}
              submit={(v) =>
                actions({
                  type: "Edit",
                  attribute: {
                    attribute_name: v,
                    attribute_name_ascii: generateId(v),
                  },
                  id: attribute.id,
                  index,
                })
              }
            />
          )}
        </Modal>
      </ItemRightCta>
    </>
  );
}
