import useProductAction from "../_hooks/useProductAction";
import { useProductDetailContextForce } from "./ProductContext";
import HTMLReactParser from "html-react-parser/lib/index";

export default function Description() {
  const { isFetching } = useProductAction();
  const { product } = useProductDetailContextForce();

  return (
    <div className={`overflow-hidden ${isFetching ? "disabled" : ""}`}>
      <div className="content [&>*]:mt-5 [&>p]:text-[#495057] [&>h5]:font-[500] [&>h5]:text-xl [&>img]:rounded-[8px] sm:[&>img]:max-w-[80%] [&>img]:mx-auto">
        {HTMLReactParser(product.description.content || "")}
      </div>
    </div>
  );
}
