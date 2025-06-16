import { Button, Modal, type ModalRef } from "@/share/components";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useRef } from "react";
import AddProductForm from "./AddProductModal";

export default function AddProductButton() {
  const modalRef = useRef<ModalRef>(null);

  return (
    <>
      <Button onClick={modalRef.current?.open}>
        <PlusIcon className="w-6" />
        <span className="hidden ml-[6px] sm:block">Add new</span>
      </Button>

      <Modal ref={modalRef}>
        <AddProductForm closeModal={modalRef.current?.close} type="Add"  />
      </Modal>
    </>
  );
}
