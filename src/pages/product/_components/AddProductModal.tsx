import Gallery from "@/compoennts/gallery";
import {
  Button,
  Image,
  Modal,
  ModalHeader,
  ModalWrapper,
  type ModalRef,
} from "@/share/components";
import { generateId, initProductObject } from "@/utils/appHelper";
import { useMemo, useRef, useState } from "react";
import useAddProduct from "../_hooks/useAddProduct";
import { useCategoryContext } from "@/stores/CategoryContext";
import { PhotoIcon } from "@heroicons/react/24/outline";

type AddProduct = {
  type: "Add";
  closeModal?: () => void;
};

type EditProduct = {
  type: "Edit";
  product: Product;
  closeModal?: () => void;
};

type Props = AddProduct | EditProduct;

export default function AddProductForm({ closeModal, ...props }: Props) {
  const { categories } = useCategoryContext();

  const [productData, setProductData] = useState<ProductSchema>(() => {
    switch (props.type) {
      case "Edit":
        const { product } = props;

        return initProductObject({
          image_url: product.image_url,
          product_name: product.product_name,
          product_name_ascii: product.product_name_ascii,
          brand_id: product.brand_id,
          category_id: product.category_id,
        });
      default:
        return initProductObject({});
    }
  });

  const [isChange, setIsChange] = useState(false);

  const nameRef = useRef(null);
  const modalRef = useRef<ModalRef>(null);

  // use hooks
  const { addProduct, isFetching } = useAddProduct({
    closeModal: modalRef.current?.close,
  });

  const currentCategory = useMemo(
    () =>
      productData
        ? categories.find((c) => c.id === productData.category_id)
        : undefined,
    [categories, productData?.category_id],
  );

  const brandByCategory = useMemo(
    () => (currentCategory ? currentCategory.brands : []),
    [productData?.category_id],
  );

  const ableToSubmit = useMemo(
    () =>
      productData &&
      isChange &&
      !!productData.product_name &&
      productData.category_id !== undefined &&
      productData.brand_id !== undefined,
    [productData, isChange],
  );

  const title = useMemo(() => {
    switch (props.type) {
      case "Add":
        return "Add new product";
      case "Edit":
        return `Edit product ${props.product.product_name}`;
    }
  }, []);

  const handleInput = (field: keyof ProductSchema, value: any) => {
    if (!productData) return;
    setIsChange(true);

    if (field === "product_name") {
      return setProductData({
        ...productData,
        [field]: value,
        product_name_ascii: generateId(value),
      });
    }

    setProductData({ ...productData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!ableToSubmit || !productData) return;

    switch (props.type) {
      case "Add":
        await addProduct({ variant: "Add", product: productData });
        break;

      case "Edit":
        await addProduct({
          variant: "Edit",
          product: productData,
          id: props.product.id,
        });

        break;
    }

    closeModal && closeModal();
  };

  return (
    <>
      <ModalWrapper className="w-[800px] ">
        <ModalHeader closeModal={closeModal} title={title} />
        <div className="flex-grow overflow-x-hidden">
          <div className="sm:flex sm:flex-row mx-[-8px] mt-[14px] pb-[30px]">
            <div className="w-full flex-shrink-0 sm:w-1/3 px-[8px]">
              <Image className="mx-auto aspect-[1/1] rounded-md" src={productData.image_url} />

              <p className="text-center mt-3">
                <Button
                  colors={"second"}
                  onClick={() => modalRef.current?.open()}
                >
                  <PhotoIcon className="w-6" />
                  <span>Change image</span>
                </Button>
              </p>
            </div>

            <div className="mt-[30px] sm:mt-0 w-full">
              <div className="space-y-[14px] px-[8px]">
                <div className="space-y-[4px]">
                  <label htmlFor="">Name</label>
                  <input
                    ref={nameRef}
                    name="name"
                    type="text"
                    className="my-input"
                    value={productData.product_name}
                    onChange={(e) =>
                      handleInput("product_name", e.target.value)
                    }
                  />
                </div>

                <div
                  className={`space-y-[4px] ${props.type === "Edit" ? "disabled" : ""}`}
                >
                  <label htmlFor="">Category</label>
                  <select
                    name="category"
                    className="my-input"
                    value={productData.category_id}
                    onChange={(e) =>
                      e.target.value
                        ? handleInput("category_id", +e.target.value)
                        : {}
                    }
                  >
                    <option value={undefined}>- - -</option>
                    {!!categories.length &&
                      categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.category_name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-[4px]">
                  <label htmlFor="">Brand</label>
                  <select
                    className="my-input"
                    value={productData.brand_id}
                    onChange={(e) =>
                      e.target.value
                        ? handleInput("brand_id", +e.target.value)
                        : {}
                    }
                  >
                    <option value={undefined}>- - -</option>
                    {!!brandByCategory.length &&
                      brandByCategory.map((brand, index) => (
                        <option key={index} value={brand.id}>
                          {brand.brand_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-right mt-[10px]">
          <Button
            loading={isFetching}
            disabled={!ableToSubmit}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </ModalWrapper>

      <Modal ref={modalRef}>
        <Gallery
          closeModal={modalRef.current?.close}
          setImageUrl={(images) =>
            handleInput("image_url", images[0].image_url)
          }
        />
      </Modal>
    </>
  );
}
