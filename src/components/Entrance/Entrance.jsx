// import clsx from "clsx";
import { useDispatch } from "react-redux";
import css from "./Entrance.module.css";
import sprite from "/sprite.svg";
import { openLogin, openRegistration } from "../../redux/modal/slice";

const Entrance = () => {
  const dispatch = useDispatch();

  const login = () => {
    dispatch(openLogin());
  };

  const registration = () => {
    dispatch(openRegistration());
  };

  return (
    <div className={css.enter}>
      <div className={css.login} onClick={login}>
        <svg>
          <use href={sprite + "#login"}></use>
        </svg>
        <p>Log in</p>
      </div>
      <div className={css.registration} onClick={registration}>
        Registration
      </div>
    </div>
  );
};

export default Entrance;
