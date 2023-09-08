// import React from 'react'
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import app_api from "../config/config";

const Forgotpass2 = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="rounded-lg bg-dark-fill-200 pt-10 pb-8 px-[4rem] text-text-variant max-w-[500px] border border-stroke-light-100">
      <span className="block text-3xl text-text text-center">
        Did you Forgot Password ? Dont Worry!!
      </span>
      <span className="block text-center text-text-variant2 text-sm">
        Enter your email address in the input box ↓↓↓
      </span>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values, { setSubmitting }) => {}}
      >
        {({ handleBlur, handleChange, handleSubmit, values }) => (
          <form noValidate className="mt-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="login.email" className="block text-lg">
                Email :
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

            <button
              type="submit"
              className="block bg-primary text-text py-4 text-lg mt-7 rounded-lg w-full mb-2"
            >
              Get reset link
            </button>
            <span className="block text-center">
              <span className="text-text-variant2">Go to login page</span>
              <span className="ml-2 text-primary underline">Login Page</span>
            </span>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Forgotpass2;
