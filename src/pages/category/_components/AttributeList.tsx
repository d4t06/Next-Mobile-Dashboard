import { useCategoryContext } from "@/stores/CategoryContext";
import { useMemo } from "react";
import { useCurrentCategoryContext } from "./CurrentCategoryContext";
import AddNewAttributeBtn from "./AddNewAttributeBtn";
import AttributeItem from "./AttributeItem";
import NotFound from "@/share/components/NotFound";
import ChangeAttributeOrder from "./ChangeAttributeOrderBtn";

export default function AttributeList() {
  const { categories } = useCategoryContext();
  const { currentCategory, setCurrentIndex } = useCurrentCategoryContext();

  const orderedAttribute = useMemo(() => {
    if (!currentCategory) return [];

    return currentCategory?.attribute_order
      .split("_")
      .map((id) => currentCategory?.attributes.find((att) => att.id === +id));
  }, [currentCategory, categories]);

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

        <AddNewAttributeBtn />
      </div>

      {orderedAttribute.length ? (
        <div className="flex flex-wrap -mx-2 mt-3">
          {orderedAttribute.map((a, i) =>
            a ? (
              <AttributeItem
                key={i}
                attribute={a}
                index={currentCategory?.attributes.findIndex(
                  (att) => att.id === a.id,
                )}
              />
            ) : (
              <div key={i}>wrong index</div>
            ),
          )}
        </div>
      ) : (
        <NotFound />
      )}

      <div className="mt-5">
        <ChangeAttributeOrder />
      </div>
    </>
  );
}
