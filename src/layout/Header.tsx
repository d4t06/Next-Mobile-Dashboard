import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../stores/AuthContext";
// import axios from "axios";
import { useRef } from "react";
import { Modal, ConfirmModal, type ModalRef } from "../share/components";
import MobileSidebar from "./MobileSidebar";

// const URL =
//   (import.meta.env.VITE_API_ENDPOINT || "https://nest-mobile.vercel.app/api") +
//   "/auth/logout";

export default function Header() {
  const { user, setUser } = useAuthContext();

  const modalRef = useRef<ModalRef>(null);

  const logout = async () => {
    try {
      // await axios.get(URL);

      document.cookie =
        "refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

      setUser(null);
    } catch (error) {}
  };

  return (
    <>
      <div className="fixed z-[90] bg-white sm:pl-[160px] top-0 left-0 right-0 h-[60px] border border-b-1 border/black/10">
        <div className="px-[10px]  flex justify-between items-center h-full">
          <MobileSidebar />

          <h1 className="line-clamp-1 text-xs font-medium">{JSON.stringify(document.cookie)}</h1>

          <button
            onClick={() => modalRef.current?.open()}
            className="flex items-center space-x-1"
          >
            <span>{user?.username}</span>
            <ArrowRightStartOnRectangleIcon className="w-6" />
          </button>
        </div>
      </div>

      <Modal ref={modalRef}>
        <ConfirmModal
          submit={logout}
          closeModal={() => modalRef.current?.close()}
          loading={false}
          label="Logout ?"
        />
      </Modal>
    </>
  );
}
