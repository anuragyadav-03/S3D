import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import app_api from "../config/config";
import { AxiosError } from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let user = Cookies.get("s3d-v2-user");
    if (!!user) {
      navigate("/project");
    }
  }, []);

  const forgotPass = () => {
    // let path = `newPath`;
    navigate("/forgotpass");
  };

  return (
    <div className="rounded-lg bg-dark-fill-200 pt-10 pb-8 px-[4rem] text-text-variant max-w-[500px] border border-stroke-light-100">
      <span className="block text-3xl text-text text-center">
        Login to you account
      </span>
      <span className="block text-center text-text-variant2 text-sm">
        Welcome back! Select a method to log in:
      </span>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          app_api
            .post("/auth/login", values)
            .then((res) => res.data)
            .then((res) => {
              Cookies.set("s3d-v2-user", JSON.stringify(res));
              navigate("/project");
            })
            .catch((err) => {
              setError(err.response?.data?.message);
              setSubmitting(false);
            });
        }}
      >
        {({ handleBlur, handleChange, handleSubmit, values }) => (
          <form noValidate className="mt-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="login.email" className="block text-lg">
                Email
              </label>
              <input
                name="email"
                type="email"
                autoComplete="username"
                className="rounded-lg bg-text py-4 pl-4 w-full text-fill-dark-300"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="mt-5">
              <label htmlFor="login.password" className="block text-lg">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="password"
                className="rounded-lg bg-text py-4 pl-4 w-full text-fill-dark-300"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <p
              className="hover:underline  text-primary w-full link underline-offset-3 cursor-pointer relative left-60 top-4 "
              onClick={forgotPass}
            >
              Forgot Password ?
            </p>
            <button
              type="submit"
              className="block bg-primary text-text py-4 text-lg mt-7 rounded-lg w-full mb-2"
            >
              Log In
            </button>
            <span className="block text-center">
              <span className="text-text-variant2">Don't have an account?</span>
              <span className="ml-2 text-primary underline">Create now</span>
            </span>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
