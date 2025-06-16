import { useCategoryContext } from "@/stores/CategoryContext";
import { useCurrentCategoryContext } from "./CurrentCategoryContext";
import AddNewBrandBtn from "./AddNewBrandBtn";
import BrandItem from "./BrandItem";
import NotFound from "@/share/components/NotFound";

export default function BrandList() {
  const { categories } = useCategoryContext();
  const { setCurrentIndex, currentCategory } = useCurrentCategoryContext();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-[10px]">
          <p className="{classes.label}">Category:</p>
          <div className="bg-[#ccc] rounded-[12px]">
            <select
              disabled={!categories.length}
              className="min-w-[100px] my-input"
              onChange={(e) => setCurrentIndex(+e.target.value)}
            >
              <option value={undefined}>---</option>

              {categories.map((c, i) => (
                <option key={i} value={i}>
                  {c.category_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AddNewBrandBtn />
      </div>

      {currentCategory?.brands.length ? (
        <div className="flex flex-wrap -mx-2 mt-3">
          {currentCategory.brands.map((b, i) => (
            <BrandItem brand={b} index={i} key={i} />
          ))}
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}
