// import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import css from "./Entrance.module.css";
import sprite from "/sprite.svg";
import { openLogin, openRegistration } from "../../redux/modal/slice";
import { selectAuthUser, selectIsSignedIn } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";

const Entrance = ({ randomNumber }) => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);
  const authUser = useSelector(selectAuthUser);

  const login = () => {
    dispatch(openLogin());
  };

  const logout = () => {
    dispatch(logOut());
  };

  const registration = () => {
    dispatch(openRegistration());
  };

  return (
    <div className={css.enter}>
      {isSignedIn && (
        <>
          <div className={css.helloLogin}>Hello {authUser?.displayName}</div>
          <div className={css.logOut} onClick={logout}>
            LogOut
          </div>
        </>
      )}
      {!isSignedIn && (
        <>
          <div
            className={`${css.login} ${css[`login${randomNumber}`]}`}
            onClick={login}
          >
            <svg>
              <use href={sprite + "#login"}></use>
            </svg>
            <p>Log in</p>
          </div>
          <div className={css.registration} onClick={registration}>
            Registration
          </div>
        </>
      )}
    </div>
  );
};

export default Entrance;
