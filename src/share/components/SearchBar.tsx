import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import type { FormEventHandler, RefObject } from "react";

type Props = {
  handleSubmit: () => void;
  value: string;
  setValue: (v: string) => void;
  inputRef?: RefObject<HTMLInputElement>;
};
export default function Searchbar({
  handleSubmit,
  setValue,
  value,
  inputRef,
}: Props) {
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!!value.trim()) handleSubmit();
  };

  return (
    <>
      <form className="flex items-center space-x-2" onSubmit={submit}>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="..."
          className="my-input w-full"
          type="text"
          name=""
        />

        <Button size="clear" className="p-1">
          <MagnifyingGlassIcon className="w-6" />
        </Button>
      </form>
    </>
  );
}
