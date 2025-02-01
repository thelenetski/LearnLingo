import { useDispatch, useSelector } from "react-redux";
import css from "./TeachersPage.module.css";
import { useState, useEffect, useRef } from "react";
import Loader from "../../components/Loader/Loader";
import LoadBtnMore from "../../components/LoadBtnMore/LoadBtnMore";
import { fetchTeachers } from "../../redux/teachers/operations";
import {
  selectFilters,
  selectLoading,
  selectTeachers,
} from "../../redux/teachers/selectors";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

const TeachersPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const filters = useSelector(selectFilters);
  const data = useSelector(selectTeachers);

  const [articles, setArticles] = useState([]); // Список загруженных учителей
  const [filteredArticles, setFilteredArticles] = useState([]); // Отфильтрованный список
  const [currentPage, setCurrentPage] = useState(1);

  const articlesRef = useRef(null);
  const pageSize = 4;

  // Загружаем первую страницу данных при монтировании
  useEffect(() => {
    dispatch(fetchTeachers({ pageSize }))
      .unwrap()
      .then((data) => {
        if (data) {
          setArticles(data.teachers); // Устанавливаем данные
        }
      })
      .catch((error) => console.error(error));

    document.body.classList.add("teachersBg");
    return () => {
      document.body.classList.remove("teachersBg");
    };
  }, [dispatch]);

  // Фильтрация данных при изменении `articles` или `filters`
  useEffect(() => {
    if (!filters || Object.keys(filters).length === 0) {
      setFilteredArticles(articles);
      return;
    }

    const filtered = articles.filter((teacher) =>
      Object.entries(filters).every(([key, value]) => {
        const teacherValue = teacher[key];

        if (key === "languages" || key === "levels") {
          return Array.isArray(teacherValue) && teacherValue.includes(value);
        }

        if (key === "prices") {
          return teacher.price_per_hour === Number(value);
        }

        return teacherValue === value;
      })
    );

    setFilteredArticles(filtered);
  }, [articles, filters]);

  // Загрузка следующей страницы
  const loadMore = () => {
    if (!loading && data.hasMore) {
      dispatch(fetchTeachers({ pageSize, lastKey: data.lastKey }))
        .unwrap()
        .then((data) => {
          if (data) {
            setArticles((prev) => [...prev, ...data.teachers]);
            setCurrentPage((prev) => prev + 1);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  // Скролл вниз после загрузки новых данных
  useEffect(() => {
    if (window.scrollY > 500) {
      if (currentPage > 1) {
        window.scrollBy({
          top: 368,
          behavior: "smooth",
        });
      }
    }
  }, [articles, filteredArticles]);

  return (
    <main className={css.main}>
      <div className={css.container}>
        {data.teachers && <FilterPanel data={articles} />}
        <section className={css.catalog}>
          {filteredArticles.length === 0 && (
            <p style={{ textAlign: "center" }}>Nothing found</p>
          )}
          <ul ref={articlesRef}>
            {filteredArticles.map((item, index) => (
              <li key={index}>
                <TeacherCard data={item} />
              </li>
            ))}
          </ul>
          {data.hasMore && !loading && (
            <LoadBtnMore onNext={loadMore}>
              {loading ? "Loading..." : "Load more"}
            </LoadBtnMore>
          )}
          {loading && <Loader />}
        </section>
      </div>
    </main>
  );
};

export default TeachersPage;
