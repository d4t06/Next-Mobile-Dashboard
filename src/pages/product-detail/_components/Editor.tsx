import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef, useImperativeHandle, useState, type Ref } from "react";
import EditorToolBar from "./EditorToolbar";
import { ModalWrapper } from "@/share/components";

type Props = {
  submit: (value: string) => void;
  className?: string;
  content: string;
};

export type EditorRef = {
  lock: () => void;
};

function MyEditor({ submit, content }: Props, ref: Ref<EditorRef>) {
  const [isChange, setIsChange] = useState(false);
  const [isLock, setIsLock] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    onUpdate: () => setIsChange(true),
    content,
  });

  const lock = () => {
    setIsChange(false);
    setIsLock(true);
  };

  useImperativeHandle(ref, () => ({ lock }));

  return (
    <>
      <ModalWrapper className="!p-0 overflow-hidden w-[900px]">
        <EditorToolBar
          isLock={isLock}
          toggleLock={() => setIsLock(!isLock)}
          isChange={isChange}
          submit={() => submit(editor?.getHTML() || "")}
          editor={editor}
        />
        <div
          className={`flex-grow overflow-auto ${isLock ? "pointer-events-none" : ""}`}
        >
          <EditorContent
            className="pt-[30px] sm:w-[70%] sm:mx-auto px-[20px] sm:px-[50px] pb-[50vh] [&_*]:mt-5 [&_p]:text-[#495057] [&_h5]:font-[500] [&_h5]:text-xl [&_img]:rounded-[6px] [&_img]:mx-auto [&_img]:border-[2px] [&_img]:border-transparent [&_.ProseMirror-selectednode]:border-red-500"
            editor={editor}
          />
        </div>
      </ModalWrapper>
    </>
  );
}

export default forwardRef(MyEditor);
