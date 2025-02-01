import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./LoginForm.module.css";
import sprite from "/sprite.svg";
import { FaRegEye } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthLoading } from "../../redux/auth/selectors";
import { signIn } from "../../redux/auth/operations";
import { closeModal } from "../../redux/modal/slice";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(signIn(data))
      .unwrap()
      .then(() => {
        dispatch(closeModal());
        toast.success("Login successfully!");
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  return (
    <div className={css.loginContainer}>
      <h1 className={css.title}>Log In</h1>
      <p className={css.description}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.formGroup}>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Email"
            className={css.input}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={`${css.formGroup} ${css.passwordGroup}`}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className={css.input}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={css.togglePassword}
          >
            {showPassword ? (
              <FaRegEye />
            ) : (
              <svg>
                <use href={sprite + "#eye-off"}></use>
              </svg>
            )}
          </button>
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className={css.loginButton}>
          {loading.signIn ? "Loading..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
