import Gallery from "@/compoennts/gallery";
import { Button, Modal, type ModalRef } from "@/share/components";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { Editor, type Content } from "@tiptap/react";

type Props = {
  editor: Editor | null;
  isChange: boolean;
  isLock: boolean;
  toggleLock: () => void;
  submit: () => void;
};

export default function EditorToolBar({
  editor,
  isChange,
  isLock,
  submit,
  toggleLock,
}: Props) {
  const modalRef = useRef<ModalRef>(null);

  const handleAddImage = (imageList: ImageType[]) => {
    if (!editor) return;
    const imageContents: Content[] = imageList.map((i) => ({
      type: "image",
      attrs: {
        src: i.image_url,
      },
    }));

    editor.chain().focus().insertContent(imageContents).run();
  };

  const classes = {
    left: "flex mt-[-8px] ml-[-8px] flex-wrap [&_button]:px-[6px] [&_button]:mt-[8px] [&_button]:ml-[8px] [&_button]:font-[500] [&_button]:py-[3px] [&_button.active]:bg-white [&_button.active]:text-[#cd1818] [&_button.active]:rounded-[6px] ",
    right:
      "right flex flex-col space-y-[8px] sm:space-x-[8px] sm:space-y-0 sm:flex-row items-center",
  };

  return (
    <>
      <div className="bg-[#cd1818] text-white flex justify-between items-center p-[10px]">
        <div className={`${classes.left} ${isLock ? "disabled" : ""}`}>
          <button
            onClick={() => editor?.chain().focus()!.setParagraph().run()}
            className="editor?.isActive('paragraph') ? 'active' : ''"
          >
            paragraph
          </button>
          <button
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className="editor?.isActive('heading', { level: 5 }) ? 'active' : ''"
          >
            h5
          </button>
          <button onClick={modalRef.current?.open}>image</button>
          <button
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().chain().focus().undo().run()}
          >
            undo
          </button>
          <button
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().chain().focus().redo().run()}
          >
            redo
          </button>
        </div>
        <div className={classes.right}>
          <Button
            size="clear"
            colors="second"
            className="text-sm px-2 py-1"
            disabled={!isChange}
            onClick={submit}
          >
            save
          </Button>

          <button onClick={toggleLock}>
            {isLock ? (
              <LockClosedIcon className="w-6" />
            ) : (
              <LockOpenIcon className="w-6" />
            )}
          </button>
        </div>
      </div>

      <Modal ref={modalRef}>
        <Gallery
          closeModal={modalRef.current?.close}
          multiple
          setImageUrl={handleAddImage}
        />
      </Modal>
    </>
  );
}
