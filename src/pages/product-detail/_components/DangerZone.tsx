import { Button, ConfirmModal, Modal, type ModalRef } from "@/share/components";
import { useRef } from "react";
import useProductAction from "../_hooks/useProductAction";
import { useProductDetailContextForce } from "./ProductContext";

export default function DangerZone() {
  const { product } = useProductDetailContextForce();

  const modalRef = useRef<ModalRef>(null);

  const { action, isFetching } = useProductAction();

  return (
    <div className="p-5 rounded-lg border border-red-500">
      <Button onClick={modalRef.current?.open}>Delete</Button>
      <Modal ref={modalRef}>
        <ConfirmModal
          loading={isFetching}
          closeModal={modalRef.current?.close}
          submit={() => action({ variant: "delete", id: product.id })}
        />
      </Modal>
    </div>
  );
}
