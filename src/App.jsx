import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader.jsx";
import ModalWindow from "./components/ModalWindow/ModalWindow.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectTypeModal } from "./redux/modal/selectors.js";
import { modalTypes } from "./redux/modal/slice.js";
import Navigation from "./components/Navigation/Navigation.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import BookingForm from "./components/BookingForm/BookingForm.jsx";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import { refreshUser } from "./redux/auth/operations.js";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const TeachersPage = lazy(() =>
  import("./pages/TeachersPage/TeachersPage.jsx")
);
const FavoritesPage = lazy(() =>
  import("./pages/FavoritesPage/FavoritesPage.jsx")
);

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const type = useSelector(selectTypeModal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
    const number = Math.floor(Math.random() * 5) + 1;
    setRandomNumber(number);
  }, [dispatch]);

  return (
    <>
      <Navigation randomNumber={randomNumber} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage randomNumber={randomNumber} />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute component={<FavoritesPage />} redirectTo="/" />
            }
          />
        </Routes>
      </Suspense>
      <ModalWindow>
        {type === modalTypes.login && <LoginForm />}
        {type === modalTypes.registration && <SignUpForm />}
        {type === modalTypes.booking && <BookingForm />}
      </ModalWindow>
      <div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
