// import React from 'react'
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {AiOutlineWarning} from 'react-icons/fa/'
import { FiAlertTriangle } from "react-icons/fi";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Forgotpass = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="rounded-lg bg-dark-fill-200 pt-10 pb-8 px-[4rem] text-text-variant max-w-[500px] border border-stroke-light-100">
      <span className="relative right-8 bottom-4">
        <IoArrowBackCircleOutline style={{ fontSize: "3rem" }} />
      </span>
      <span className="block text-3xl text-text text-center">
        Forgot Password
      </span>
      <span className="block text-center text-text-variant2 text-sm">
        No Worries,we'll send you reset instructions.
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
            <div className="flex items-center rounded-md bg-fill-dark-100 my-2">
              <FiAlertTriangle className="text-red-600" />
              <span className="text-[10px]">
                We can't seem to find right email address for you .Please
                re-enter the correct email.
              </span>
            </div>

            <button
              type="submit"
              className="block bg-primary text-text py-4 text-lg mt-7 rounded-lg w-full mb-2"
            >
              Send reset link
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

export default Forgotpass;
