import { CategoryPage, ProductPage, ProductDetailPage } from "../pages";

const routes = {
  home: "/",
  productDetail: "/product/:id",
  category: "/category",
};

const routeList = [
  { path: routes.home, component: ProductPage },
  { path: routes.productDetail, component: ProductDetailPage },
  { path: routes.category, component: CategoryPage },
];

export { routeList };
