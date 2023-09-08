import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Resetpass = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="rounded-lg bg-dark-fill-200 pt-10 pb-8 px-[4rem] text-text-variant max-w-[500px] border border-stroke-light-100">
      <p className="relative right-8 bottom-4 ">
        <IoArrowBackCircleOutline style={{ fontSize: "3rem" }} />
      </p>
      <span className="block text-3xl text-text text-center">
        Set new Password
      </span>
      <span className="block text-center text-text-variant2 text-sm">
        Must be atleast 8 characters!
      </span>
      <form noValidate className="mt-5">
        <div className="mt-5">
          <label htmlFor="login.password" className="block text-lg">
            Enter new password
          </label>
          <input
            name="password"
            type="password"
            autoComplete="password"
            className="rounded-lg bg-text py-4 pl-4 w-full text-fill-dark-300"
            placeholder="Password"
          />
        </div>
        <p className="text-primary text-sm">Strength is too weak</p>
        <div className="mt-5">
          <label htmlFor="login.password" className="block text-lg">
            Confirm new password
          </label>
          <input
            name="password"
            type="password"
            autoComplete="password"
            className="rounded-lg bg-text py-4 pl-4 w-full text-fill-dark-300"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="block bg-primary text-text py-4 text-lg mt-7 rounded-lg w-full mb-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Resetpass;
