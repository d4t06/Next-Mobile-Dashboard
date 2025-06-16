import NotFound from "@/share/components/NotFound";
import CategoryItem from "./CategoryItem";
import { useCategoryContext } from "@/stores/CategoryContext";

export default function CategoryList() {
  const { categories } = useCategoryContext();

  return (
    <>
      <div className="flex flex-wrap -mx-2 -mt-2">
        {categories ? (
          categories.map((c, i) => (
            <CategoryItem key={i} index={i} category={c} />
          ))
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}
