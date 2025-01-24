import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader.jsx";
import ModalWindow from "./components/ModalWindow/ModalWindow.jsx";
import { useSelector } from "react-redux";
import { selectTypeModal } from "./redux/modal/selectors.js";
import { modalTypes } from "./redux/modal/slice.js";
import Navigation from "./components/Navigation/Navigation.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
// const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage.jsx"));
// const CamperPage = lazy(() => import("./pages/CamperPage/CamperPage.jsx"));

function App() {
  const type = useSelector(selectTypeModal);

  return (
    <>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CamperPage />} /> */}
        </Routes>
      </Suspense>
      <ModalWindow>
        {type === modalTypes.login && <p>Login</p>}
        {type === modalTypes.registration && <p>Register</p>}
      </ModalWindow>
    </>
  );
}

export default App;
