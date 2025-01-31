import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./BookingForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectContentModal } from "../../redux/modal/selectors";
import toast from "react-hot-toast";
import { closeModal } from "../../redux/modal/slice";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone is required"),
});

const BookingForm = () => {
  const data = useSelector(selectContentModal);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reason: "Career and business",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(closeModal());
    toast.success("Booking successfully!");
  };

  return (
    <div className={css.bookingContainer}>
      <h1 className={css.title}>Book trial lesson</h1>
      <p className={css.description}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      {data && (
        <div className={css.teacher}>
          <img src={data.avatar_url} alt="teachers-avatar" />
          <div className={css.name}>
            <span>Your teacher</span>
            <p>{`${data.name} ${data.surname}`}</p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2>What is your main reason for learning English?</h2>
        <div className={css.radioBtn}>
          <label>
            <input
              type="radio"
              value="Career and business"
              {...register("reason", { required: true })}
            />
            Career and business
          </label>
        </div>
        <div className={css.radioBtn}>
          <label>
            <input
              type="radio"
              value="Lesson for kids"
              {...register("reason", { required: true })}
            />
            Lesson for kids
          </label>
        </div>
        <div className={css.radioBtn}>
          <label>
            <input
              type="radio"
              value="Living abroad"
              {...register("reason", { required: true })}
            />
            Living abroad
          </label>
        </div>
        <div className={css.radioBtn}>
          <label>
            <input
              type="radio"
              value="Exams and coursework"
              {...register("reason", { required: true })}
            />
            Exams and coursework
          </label>
        </div>
        <div className={css.radioBtn}>
          <label>
            <input
              type="radio"
              value="Culture, travel or hobby"
              {...register("reason", { required: true })}
            />
            Culture, travel or hobby
          </label>
        </div>
        <div className={css.formGroupWrap}>
          <div className={css.formGroup}>
            <input
              id="name"
              {...register("name")}
              placeholder="Name"
              className={css.input}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>

          <div className={css.formGroup}>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email"
              className={css.input}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={css.formGroup}>
            <input
              id="phone"
              {...register("phoneNumber")}
              placeholder="Phone number"
              className={css.input}
            />
            {errors.phoneNumber && (
              <p className={css.error}>{errors.phoneNumber.message}</p>
            )}
          </div>
        </div>
        <button type="submit" className={css.bookingButton}>
          Book
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
