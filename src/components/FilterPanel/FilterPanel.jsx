import css from "./FilterPanel.module.css";
import FilterItem from "../FilterItem/FilterItem";

const FilterPanel = ({ data }) => {
  const languages = [
    ...new Set(data.flatMap((teacher) => teacher.languages)),
  ].sort();

  const levels = [...new Set(data.flatMap((teacher) => teacher.levels))].sort();

  const prices = [
    ...new Set(data.flatMap((teacher) => teacher.price_per_hour)),
  ].sort();

  return (
    <div className={css.filterWrap}>
      <div className={css.filterBox} style={{ width: "221px" }}>
        <p>Languages</p>
        <FilterItem data={languages} name={"languages"} />
      </div>
      <div className={css.filterBox} style={{ width: "198px" }}>
        <p>Level of knowledge</p>
        <FilterItem data={levels} name={"levels"} />
      </div>
      <div className={css.filterBox} style={{ width: "124px" }}>
        <p>Price</p>
        <FilterItem data={prices} name={"prices"} />
        <span>$</span>
      </div>
    </div>
  );
};

export default FilterPanel;
