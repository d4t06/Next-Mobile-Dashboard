import { useParams } from "react-router-dom";
import { useProductDetailContext } from "../_components/ProductContext";
import { useState } from "react";
import { request } from "@/axios/request";
import { useToastContext } from "@/stores/ToastContext";

export default function useProductDetail() {
  const { setProduct } = useProductDetailContext();

  const { showToast } = useToastContext();

  const params = useParams<{ id: string }>();

  const [isFetching, setIsFetching] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await request.get<Product>(`/products/${params["id"]}`);

      setProduct(res.data);
    } catch (err) {
      console.log({ message: err });
      showToast(false);
    } finally {
      setIsFetching(false);
    }
  };

  return {
    isFetching,
    fetchProduct,
  };
}
