import { MyTable } from "@/share/components";
import { useProductDetailContextForce } from "./ProductContext";
import { useCategoryContext } from "@/stores/CategoryContext";
import { useMemo } from "react";
import EditSpectBtn from "./EditSpecBtn";

type Attribute = {
  cateogryAttribute: CategoryAttribute;
  productAttribute?: ProductAttribute;
};

export default function SpecTable() {
  const { product } = useProductDetailContextForce();

  const { categories } = useCategoryContext();

  const attributeData = useMemo(() => {
    if (!categories) return;

    const productCategory = categories.find(
      (cat) => cat.id === product.category_id,
    );
    if (!productCategory) return;

    const attributeOrderArray = productCategory
      ? productCategory.attribute_order.split("_")
      : [];

    const attributeData: Attribute[] = [];

    attributeOrderArray.map((id) => {
      const categoryAttribute = productCategory.attributes.find(
        (catAtt) => catAtt.id === +id,
      );
      if (categoryAttribute === undefined) return;
      const foundedValue = product.attributes.find(
        (attr) => attr.category_attribute_id == categoryAttribute.id,
      );

      const data: Attribute = {
        cateogryAttribute: categoryAttribute,
        productAttribute: foundedValue,
      };

      attributeData.push(data);
    });

    return attributeData;
  }, [product]);

  return (
    <>
      <MyTable colList={["Name", "Value", ""]}>
        {attributeData?.map((data,i) => (
          
            <tr key={i} className="first:border-none" v-for="data in attributeData">
              <td>{data.cateogryAttribute.attribute_name}</td>
              <td className="whitespace-break-spaces">
                {data.productAttribute?.value || "..."}
              </td>

              <td className="text-right">
                <EditSpectBtn
                  categoryAttribute={data.cateogryAttribute}
                  productAttribute={data.productAttribute}
                />
              </td>
            </tr>
          
        ))}
      </MyTable>
    </>
  );
}
