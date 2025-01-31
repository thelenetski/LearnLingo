import { useDispatch, useSelector } from "react-redux";
import css from "./FilterItem.module.css";
import { setFilters } from "../../redux/teachers/slice";
import { selectFilters } from "../../redux/teachers/selectors";
import Select from "react-select";

const FilterItem = ({ data, name }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const filterHandler = (value) => {
    dispatch(setFilters({ ...filters, [name]: value }));
  };

  const truncateText = (text, maxLength = 15) =>
    text.length > maxLength ? text.slice(0, maxLength) + "…" : text;

  const options = data.map((item) => ({ value: item, label: item }));

  return (
    <div className={css.filterItemWrap}>
      <Select
        className={css.filterItem}
        placeholder={data[0]}
        options={options}
        getOptionLabel={(e) => truncateText(e.label, 15)}
        onChange={(selectedOption) => filterHandler(selectedOption.value)}
        isSearchable={false}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: "none",
            borderRadius: 14,
            width: "auto",
            fontSize: 18,
            fontWeight: "500",
            padding: "6px 10px",
            cursor: "pointer",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#121417",
          }),
          menu: (provided) => ({
            ...provided,
            width: "100%",
            minWidth: "124px",
            backgroundColor: "#fff", // Фон меню
            borderRadius: "14px", // Скругление углов
            boxShadow: "none", // Тень
            padding: "14px 18px", // Внутренние отступы
          }),
          menuList: (provided) => ({
            ...provided,
            padding: "0px",
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? "#121417" : "#12141733", //цвет текста при наведении, черный по умолчанию
            padding: "4px 0",
            cursor: "pointer",
            fontSize: 18,
            fontWeight: "500",
          }),
          indicatorSeparator: () => ({ display: "none" }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "none",
            primary: "none",
          },
        })}
      />
    </div>
  );
};

export default FilterItem;
