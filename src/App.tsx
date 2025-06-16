import ProductProvider from "./stores/ProductContext";
import CategoryProvider from "./stores/CategoryContext";
import GalleryProvider from "./stores/GalleryContext";
import AuthProvider from "./stores/AuthContext";

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFound";
import { RequireAuth } from "./routes/RequireAuth";
import { routeList } from "./routes";
import LoginPage from "./pages/Login";
import DefaultLayout from "./layout/DefaultLayout";
import ToastProvider from "./stores/ToastContext";
import ToastContainer from "./compoennts/toast/ToastContainer";

function App() {
  return (
    <>
      <ToastProvider>
        <AuthProvider>
          <ProductProvider>
            <CategoryProvider>
              <GalleryProvider>
                <Router>
                  <Routes>
                    <Route path="*" element={<NotFoundPage />} />

                    <Route path="login" element={<LoginPage />} />

                    <Route element={<RequireAuth />}>
                      {routeList.map((route, index) => {
                        const Page = route.component;

                        return (
                          <Route
                            key={index}
                            path={route.path}
                            element={
                              <DefaultLayout>
                                <Page />
                              </DefaultLayout>
                            }
                          />
                        );
                      })}
                    </Route>
                  </Routes>
                </Router>

                <ToastContainer />
              </GalleryProvider>
            </CategoryProvider>
          </ProductProvider>
        </AuthProvider>
      </ToastProvider>
    </>
  );
}

export default App;
