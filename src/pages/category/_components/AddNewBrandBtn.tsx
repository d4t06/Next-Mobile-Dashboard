import { AddItemModal, Button, Modal, type ModalRef } from "@/share/components";
import { useRef } from "react";
import useBrandAction from "../_hooks/useBrandAction";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCurrentCategoryContext } from "./CurrentCategoryContext";
import { generateId } from "@/utils/appHelper";

export default function AddNewBrandBtn() {
  const { currentCategory } = useCurrentCategoryContext();

  const modalRef = useRef<ModalRef>(null);
  const { actions, isFetching } = useBrandAction({ modalRef });

  return (
    <>
      <Button
        disabled={!currentCategory}
        onClick={() => modalRef.current?.open()}
        size={'clear'}
        className="p-1.5"
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
              brand: {
                brand_name: v,
                brand_name_ascii: generateId(v),
                category_id: currentCategory.id,
                image_url: "",
              },
            })
          }
          loading={isFetching}
          title="Add new brand"
        />
      </Modal>
    </>
  );
}
