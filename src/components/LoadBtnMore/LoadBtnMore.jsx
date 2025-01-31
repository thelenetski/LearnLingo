import css from './LoadBtnMore.module.css';

const LoadBtnMore = ({ onNext, children }) => {
  return (
    <div className={css.loadBtn}>
      <button type="button" onClick={onNext}>
        {children}
      </button>
    </div>
  );
};

export default LoadBtnMore;
