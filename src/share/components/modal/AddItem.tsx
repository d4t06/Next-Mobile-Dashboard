import {
  useEffect,
  useState,
  useRef,
  useMemo,
  type ReactNode,
  type FormEventHandler,
  type RefObject,
} from "react";
import ModalHeader from "./ModalHeader";
import Button from "../Button";
import { ModalWrapper } from "./Modal";

type Props = {
  closeModal?: () => void;
  submit: (value: string) => void;
  title: string;
  initValue?: string;
  children?: ReactNode;
  loading?: boolean;
  variant?: "input" | "text-are";
};

export default function AddItem({
  closeModal,
  submit,
  title,
  initValue,
  loading,
  children,
  variant = "input",
}: Props) {
  const [value, setValue] = useState(initValue || "");

  const inputRef = useRef<HTMLInputElement>(null);

  const isChanged = useMemo(() => value !== initValue, [value]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!isChanged) return;

    submit(value);
  };

  return (
    <ModalWrapper>
      <ModalHeader closeModal={closeModal} title={title} />
      <form action="" onSubmit={handleSubmit}>
        {variant === "input" && (
          <input
            className="my-input"
            ref={inputRef}
            placeholder="name..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}

        {variant === "text-are" && (
          <textarea
            className={`my-input`}
            ref={inputRef as RefObject<any>}
            placeholder="name..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}

        {children}

        <p className="text-right mt-[20px]">
          <Button
            disabled={!isChanged}
            className="min-w-[70px]"
            loading={loading}
            type="submit"
          >
            Save
          </Button>
        </p>
      </form>
    </ModalWrapper>
  );
}
