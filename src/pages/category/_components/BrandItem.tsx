import useBrandAction from "../_hooks/useBrandAction";
import simonCat from "@/assets/simon_empty.png";
import {
  PencilSquareIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  AddItemModal,
  ConfirmModal,
  Image,
  ItemRightCta,
  Modal,
  type ModalRef,
} from "@/share/components";
import { useRef, useState } from "react";
import { generateId } from "@/utils/appHelper";
import Gallery from "@/compoennts/gallery";

type Props = {
  brand: Brand;
  index: number;
};

export default function BrandItem({ brand, index }: Props) {
  type Modal = "edit" | "delete" | "image";

  const modalRef = useRef<ModalRef | null>(null);
  const [modal, setModal] = useState<Modal | "">("");

  const { actions, isFetching } = useBrandAction({ modalRef });

  const openModal = (m: Modal) => {
    setModal(m);
    modalRef.current?.open();
  };

  return (
    <>
      <div className="border-[2px] border-[#e1e1e1] rounded-lg p-2 mt-2 ml-2">
        <ItemRightCta className="bg-none border-none">
          <span>{brand.brand_name}</span>

          <div>
            <button onClick={() => openModal("edit")}>
              <PencilSquareIcon className="w-5" />
            </button>
            <button onClick={() => openModal("image")}>
              <PhotoIcon className="w-5" />
            </button>
            <button onClick={() => openModal("delete")}>
              <TrashIcon className="w-5" />
            </button>
          </div>

          <Modal ref={modalRef}>
            {modal === "delete" && (
              <ConfirmModal
                label="Delete brand"
                loading={isFetching}
                closeModal={() => modalRef.current?.close()}
                submit={() => actions({ type: "Delete", id: brand.id, index })}
              />
            )}

            {modal === "edit" && (
              <AddItemModal
                variant="input"
                title="Edit brand"
                loading={isFetching}
                closeModal={() => modalRef.current?.close()}
                initValue={brand.brand_name}
                submit={(v) =>
                  actions({
                    type: "Edit",
                    brand: {
                      brand_name: v,
                      brand_name_ascii: generateId(v),
                    },
                    id: brand.id,
                    index: index,
                  })
                }
              />
            )}

            {modal === "image" && (
              <Gallery
                closeModal={() => modalRef.current?.close()}
                setImageUrl={(images) =>
                  actions({
                    type: "Edit",
                    brand: {
                      image_url: images[0].image_url,
                    },
                    id: brand.id,
                    index: index,
                  })
                }
              />
            )}
          </Modal>
        </ItemRightCta>

        <Image
          className="w-[90px] h-[90px] object-cover mx-auto"
          src={brand.image_url || simonCat}
        />
      </div>
    </>
  );
}
