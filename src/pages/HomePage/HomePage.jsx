import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = ({ randomNumber }) => {
  return (
    <div className={css.homePageWrapper}>
      <div className={css.startBox}>
        <div className={css.getStartedBox}>
          <div className={css.title}>
            Unlock your potential with the best <span>language</span> tutors
            <div
              className={`${css.titleMark} ${css[`titleMark${randomNumber}`]}`}
            ></div>
          </div>
          <div className={css.description}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </div>
          <Link
            to="/teachers"
            className={`${css.signUpBtn} ${css[`signUpBtn${randomNumber}`]}`}
          >
            Get started
          </Link>
        </div>
        <div className={`${css.girl} ${css[`girl${randomNumber}`]}`}></div>
      </div>
      <div className={`${css.statsWrap} ${css[`statsWrap${randomNumber}`]}`}>
        <div className={css.statBox}>
          32,000 +<span>Experienced tutors</span>
        </div>
        <div className={css.statBox}>
          300,000 +<span>5-star tutor reviews</span>
        </div>
        <div className={css.statBox}>
          120 +
          <span>
            Subjects
            <br />
            taught
          </span>
        </div>
        <div className={css.statBox}>
          200 +<span>Tutor nationalities</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
