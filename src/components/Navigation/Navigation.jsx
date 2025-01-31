import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import sprite from "/sprite.svg";
import Entrance from "../Entrance/Entrance";
import { useSelector } from "react-redux";
import { selectIsSignedIn } from "../../redux/auth/selectors";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = ({ randomNumber }) => {
  const isLogin = useSelector(selectIsSignedIn);

  return (
    <header className={css.header}>
      <NavLink className={css.logo} to="/" end>
        <svg>
          <use href={sprite + "#logo"}></use>
        </svg>
        <h1>LearnLingo</h1>
      </NavLink>
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>
          <span>Home</span>
        </NavLink>
        <NavLink to={"/teachers"} className={buildLinkClass} end>
          <span>Teachers</span>
        </NavLink>
        {isLogin && (
          <NavLink to={"/favorites"} className={buildLinkClass} end>
            <span>Favorites</span>
          </NavLink>
        )}
      </nav>
      <Entrance randomNumber={randomNumber} />
    </header>
  );
};

export default Navigation;
