import { AddItemModal, Button, Modal, type ModalRef } from "@/share/components";
import { useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import useCategoryAction from "../_hooks/useCategoryAction";

export default function AddNewCategpryBtn() {
  const modalRef = useRef<ModalRef>(null);
  const { actions, isFetching } = useCategoryAction({ modalRef });

  return (
    <>
      <Button size={'clear'} className="p-1.5" onClick={() => modalRef.current?.open()}>
        <PlusIcon className="w-6" />
        <span className="hidden sm:block">Add new category</span>
      </Button>

      <Modal ref={modalRef}>
        <AddItemModal
          variant="input"
          closeModal={() => modalRef.current?.close()}
          submit={(v) =>
            actions({
              type: "Add",
              name: v,
            })
          }
          loading={isFetching}
          title="Add new category"
        />
      </Modal>
    </>
  );
}
