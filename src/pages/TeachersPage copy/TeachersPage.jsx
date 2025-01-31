import { useDispatch, useSelector } from "react-redux";
import css from "./TeachersPage.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import LoadBtnMore from "../../components/LoadBtnMore/LoadBtnMore";
import { fetchTeachers } from "../../redux/teachers/operations";
import { selectFilters, selectLoading } from "../../redux/teachers/selectors";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

const TeachersPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const filters = useSelector(selectFilters);

  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState([]);
  const articlesRef = useRef(null);

  const itemsPerPage = 4;

  const loadTeachers = () => {
    dispatch(fetchTeachers())
      .unwrap()
      .then((data) => {
        if (data) {
          setArticles(data);
          setHasMore(data.slice(0, itemsPerPage));
        }
      })
      .catch((error) => {
        console.error(error);
        setHasMore(false);
      });
  };

  useEffect(() => {
    loadTeachers();
    document.body.classList.add("teachersBg");
    return () => {
      document.body.classList.remove("teachersBg");
    };
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      if (Object.keys(filters).length === 0) {
        setFilteredArticles(articles); // Если фильтры пустые, показываем всех учителей
        setHasMore(articles.slice(0, itemsPerPage)); // Обновляем пагинацию сразу
        return;
      }

      const filtered = articles.filter((teacher) => {
        return Object.entries(filters).every(([key, value]) => {
          const teacherValue = teacher[key];

          if (key === "languages" || key === "levels") {
            return Array.isArray(teacherValue) && teacherValue.includes(value);
          }

          if (key === "prices") {
            return teacher.price_per_hour === Number(value);
          }

          return teacherValue === value;
        });
      });

      setFilteredArticles(filtered);
      setHasMore(filtered.slice(0, itemsPerPage)); // Используем только что отфильтрованные данные
    };

    applyFilters();
  }, [articles, filters, itemsPerPage]);

  const handlePageChange = () => {
    const nextPage = currentPage + 1;
    const startIndex = currentPage * itemsPerPage;
    const nextTeachers = articles.slice(startIndex, startIndex + itemsPerPage);
    setHasMore((prev) => [...prev, ...nextTeachers]);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    if (currentPage > 1) scrollWindow();
  }, [articles, currentPage]);

  const scrollWindow = () => {
    window.scrollBy({
      top: 368,
      behavior: "smooth",
    });
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <FilterPanel data={articles} />
        <section className={css.catalog}>
          {filteredArticles.length === 0 && (
            <p style={{ textAlign: "center" }}>Nothing found</p>
          )}
          <ul ref={articlesRef}>
            {Array.isArray(hasMore) &&
              hasMore.map((item, index) => {
                return (
                  <li key={index}>
                    <TeacherCard data={item} />
                  </li>
                );
              })}
          </ul>
          {hasMore.length < filteredArticles.length && (
            <LoadBtnMore onNext={handlePageChange}>
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
