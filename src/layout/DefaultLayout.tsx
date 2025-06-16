import { useEffect, useRef, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useCategoryContext } from "@/stores/CategoryContext";
import { request } from "@/axios/request";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const ranEffect = useRef(false);

  const { setCategories, setIsFetching } = useCategoryContext();

  const getCategories = async () => {
    try {
      const res = await request.get<Category[]>(`/categories`);

      setCategories(res.data);

      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!ranEffect.current) {
      ranEffect.current = true;

      getCategories();
    }
  }, []);

  return (
    <>
      <Sidebar />

      <Header />
      <div className="sm:pl-[160px] pt-[60px]">
        <div className="px-2 sm:px-5">{children}</div>
      </div>

    </>
  );
}
