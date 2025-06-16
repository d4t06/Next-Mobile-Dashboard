import Button from "../Button";
import { ModalWrapper } from "./Modal";

type Props = {
  submit: () => void;
  label?: string;
  desc?: string;
  buttonLabel?: string;
  loading: boolean;
  closeModal?: () => void;
};

export default function ConfirmModal({
  loading,
  submit,
  label,
  closeModal,
  buttonLabel,
  desc = "This action cannot be undone",
}: Props) {
  return (
    <ModalWrapper>
      <h1 className="text-[20px] font-semibold">{label || "Wait a minute"}</h1>
      {desc && (
        <p className=" text-[16px] font-semibold text-red-500">{desc}</p>
      )}

      <div className="flex gap-[10px] mt-[20px]">
        <Button colors={"second"} onClick={closeModal}>
          Close
        </Button>
        <Button className="min-w-[120px]" loading={loading} onClick={submit}>
          {buttonLabel || "Yes please"}
        </Button>
      </div>
    </ModalWrapper>
  );
}
