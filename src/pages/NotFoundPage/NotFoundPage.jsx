import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFound = () => {
  return (
    <div className={css.main}>
      <Link
        style={{
          border: "1px solid #ccc",
          padding: "5px 10px",
          borderRadius: "15px",
        }}
        to={"/"}
      >
        Home
      </Link>
      <h2>Page not found</h2>
    </div>
  );
};

export default NotFound;
