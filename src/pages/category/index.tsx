import { useCategoryContext } from "@/stores/CategoryContext";
import AttributeList from "./_components/AttributeList";
import BrandList from "./_components/BrandList";
import CategoryList from "./_components/CategoryList";
import { Center, Loading } from "@/share/components";
import CurrentCategoryProvider from "./_components/CurrentCategoryContext";
import AddNewCategpryBtn from "./_components/AddNewCategoryBtn";

export default function CategoryPage() {
  const { isFetching } = useCategoryContext();

  const classes = {
    container: `
      [&_h1]:text-xl 
      [&>div:not(.flex)]:p-5
      [&>div:not(.flex)]:rounded-xl
      [&>div:not(.flex)]:bg-[#fff]
      [&>div:not(.flex)]:border`,
  };

  if (isFetching)
    return (
      <Center>
        <Loading />
      </Center>
    );

  return (

    <div className={`py-5 space-y-[30px] ${classes.container}`}>
      <div className="flex justify-between items-center">
        <h1 className="classes.label">Category</h1>
        <AddNewCategpryBtn />
      </div>
      <div>
        <CategoryList />
      </div>
      <h1>Brand</h1>
      <div>
        <CurrentCategoryProvider>
          <BrandList />
        </CurrentCategoryProvider>
      </div>
      <h1>Attribute</h1>
      <div>
        <CurrentCategoryProvider>
          <AttributeList />
        </CurrentCategoryProvider>
      </div>
    </div>
  );
}
