import { AddItemModal, Button, Modal, type ModalRef } from "@/share/components";
import { useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCurrentCategoryContext } from "./CurrentCategoryContext";
import { generateId } from "@/utils/appHelper";
import useAttributeAction from "../_hooks/useAttributeAction";

export default function AddNewAttributeBtn() {
  const { currentCategory } = useCurrentCategoryContext();

  const modalRef = useRef<ModalRef>(null);
  const { actions, isFetching } = useAttributeAction({ modalRef });

  return (
    <>
      <Button
        size={"clear"}
        className="p-1.5"
        disabled={!currentCategory}
        onClick={() => modalRef.current?.open()}
      >
        <PlusIcon className="w-6" />
        <span className="hidden sm:block">Add new brand</span>
      </Button>

      <Modal ref={modalRef}>
        <AddItemModal
          v-if="props.currentCategory"
          variant="input"
          closeModal={() => modalRef.current?.close()}
          submit={(v) =>
            currentCategory &&
            actions({
              type: "Add",
              categoryId: currentCategory.id,
              attribute: {
                attribute_name: v,
                attribute_name_ascii: generateId(v),
                category_id: currentCategory.id,
              },
            })
          }
          loading={isFetching}
          title="Add new attribute"
        />
      </Modal>
    </>
  );
}
