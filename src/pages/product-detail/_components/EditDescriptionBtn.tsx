import { Button, Modal, type ModalRef } from "@/share/components";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useProductDetailContextForce } from "./ProductContext";
import Editor, { type EditorRef } from "./Editor";
import useProductAction from "../_hooks/useProductAction";

export default function EditDescriptionBtn() {
  const { product } = useProductDetailContextForce();

  const { action, isFetching } = useProductAction();

  const editorRef = useRef<EditorRef>(null);

  const handleSubmit = async (v: string) => {
    await action({
      variant: "edit-desc",
      desc: { content: v },
      productId: product.id,
      callback: () => editorRef.current?.lock(),
    });
  };

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
        <Editor
          className={isFetching ? "disabled" : ""}
          ref={editorRef}
          submit={handleSubmit}
          content={product.description.content}
        />
      </Modal>
    </>
  );
}
