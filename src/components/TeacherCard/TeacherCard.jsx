import { useState } from "react";
import css from "./TeacherCard.module.css";
import sprite from "/sprite.svg";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { openBooking } from "../../redux/modal/slice";
import { addFav } from "../../redux/teachers/slice";
import { selectFavoritesTeachers } from "../../redux/teachers/selectors";
import { selectIsSignedIn } from "../../redux/auth/selectors";
import toast from "react-hot-toast";

const TeacherCard = ({ data }) => {
  const [readMore, setReadMore] = useState(false);
  const dispatch = useDispatch();
  const favTeachers = useSelector(selectFavoritesTeachers);
  const isSignIn = useSelector(selectIsSignedIn);

  const readMoreHandler = () => {
    setReadMore(!readMore);
  };

  const addFavorites = (item) => {
    if (isSignIn) {
      dispatch(addFav(item));
    } else {
      toast.error("This functionality is available only to authorized users");
    }
  };

  const bookHandler = () => {
    dispatch(openBooking(data));
  };

  return (
    <div className={css.cardWrap}>
      <div className={css.avatar}>
        <img src={data.avatar_url} alt="Teacher_avatar" />
        <div className={css.teacherStatus}></div>
      </div>
      <div className={css.box}>
        <div className={css.boxHeader}>
          <div className={css.boxName}>
            <span>Languages</span>
            <p>{`${data.name} ${data.surname}`}</p>
          </div>
          <div className={css.boxHeaderRightWrap}>
            <div className={css.boxHeaderList}>
              <div className={css.boxHeaderListItem}>
                <svg>
                  <use href={sprite + "#book"}></use>
                </svg>
                <p>Lessons online</p>
              </div>
              <div className={css.boxHeaderListItem}>
                <p>Lessons done: {data.lessons_done}</p>
              </div>
              <div className={css.boxHeaderListItem}>
                <svg>
                  <use href={sprite + "#star"}></use>
                </svg>
                <p>Rating: {data.rating}</p>
              </div>
              <div className={css.boxHeaderListItem}>
                <p>
                  Price / 1 hour:{" "}
                  <span
                    className={css.priceGreen}
                  >{`${data.price_per_hour}$`}</span>
                </p>
              </div>
            </div>
            <button className={css.boxFav} onClick={() => addFavorites(data)}>
              {favTeachers.some((item) => item.id === data?.id) && isSignIn ? (
                <svg>
                  <use href={sprite + "#yellow-heart"}></use>
                </svg>
              ) : (
                <svg>
                  <use href={sprite + "#black-heart"}></use>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className={css.boxContent}>
          <div className={css.boxContentSpeaks}>
            <p className={css.boxContentTypo}>
              <span>Speaks: </span>
              {data.languages.join(", ")}
            </p>
            <p className={css.boxContentTypo}>
              <span>Lesson Info: </span>
              {data.lesson_info}
            </p>
            <p className={css.boxContentTypo}>
              <span>Conditions: </span>
              {data.conditions.join(" ")}
            </p>
          </div>
          {!readMore && (
            <button onClick={readMoreHandler} className={css.reamMoreBtn}>
              Read more
            </button>
          )}
          {readMore && <p className={css.boxDescription}>{data.experience}</p>}
          {readMore && (
            <div className={css.reviews}>
              <ul>
                {data.reviews.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className={css.reviewsHead}>
                        <MdAccountCircle />
                        <div className={css.reviewsHeadNameRate}>
                          <p>{item.reviewer_name}</p>
                          <div>
                            <svg>
                              <use href={sprite + "#star"}></use>
                            </svg>
                            <span>{`${item.reviewer_rating}.0`}</span>
                          </div>
                        </div>
                      </div>
                      <p className={css.reviewComment}>{item.comment}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className={css.tags}>
            <ul>
              {data.levels.map((item, index) => {
                return <li key={index}>{`#${item}`}</li>;
              })}
            </ul>
          </div>
          {readMore && (
            <button className={css.bookBtn} onClick={bookHandler}>
              Book trial lesson
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
