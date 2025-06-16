import { Button, Modal, type ModalRef } from "@/share/components";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useProductDetailContextForce } from "./ProductContext";
import AddProductForm from "@/pages/product/_components/AddProductModal";

export default function EditProductBtn() {
  const { product } = useProductDetailContextForce();

  const modalRef = useRef<ModalRef>(null);

  return (
    <>
      <Button
        colors="second"
        onClick={() => modalRef.current?.open()}
        size="clear"
        className="p-1.5"
      >
        <Cog6ToothIcon className="w-6" />
      </Button>

      <Modal ref={modalRef}>
        <AddProductForm
          type="Edit"
          closeModal={() => modalRef.current?.close()}
          product={product}
        />
      </Modal>
    </>
  );
}
