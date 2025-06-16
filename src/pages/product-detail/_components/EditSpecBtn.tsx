import { AddItemModal, Button, Modal, type ModalRef } from "@/share/components";
import { useRef } from "react";
import useSpectAction from "../_hooks/useSpecAction";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useProductDetailContextForce } from "./ProductContext";

type Props = {
  productAttribute?: ProductAttribute;
  categoryAttribute: CategoryAttribute;
};

export default function EditSpectBtn({
  categoryAttribute,
  productAttribute,
}: Props) {
  const { product } = useProductDetailContextForce();

  const modalRef = useRef<ModalRef>(null);

  const { action, isFetching } = useSpectAction({ modalRef });

  return (
    <>
      <Button
        onClick={() => modalRef.current?.open()}
        className="px-3 py-1"
        size="clear"
        colors="second"
      >
        <PencilSquareIcon className="w-5" />
        <span className="hidden sm:block">Edit</span>
      </Button>

      <Modal ref={modalRef}>
        <AddItemModal
          variant="text-are"
          title={productAttribute ? "Edit attribute" : "Add Attribute"}
          initValue={productAttribute?.value}
          closeModal={() => modalRef.current?.close()}
          loading={isFetching}
          submit={(v) =>
            !productAttribute
              ? action({
                  variant: "Add",
                  productAttribute: {
                    product_id: product.id,
                    category_attribute_id: categoryAttribute.id,
                    value: v,
                  },
                })
              : action({
                  variant: "Edit",
                  id: productAttribute.id,
                  productAttribute: {
                    value: v,
                  },
                })
          }
        />
      </Modal>
    </>
  );
}
