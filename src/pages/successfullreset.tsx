import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
const Successfullreset = () => {
  return (
    <div className="rounded-lg bg-dark-fill-200 pt-10 pb-[90px] px-[4rem] text-text-variant max-w-[500px] border border-stroke-light-100">
      <p className="relative right-8 bottom-4 ">
        <IoArrowBackCircleOutline style={{ fontSize: "3rem" }} />
      </p>
      <span className="block text-3xl text-text text-center">
        Password reset Successfully
      </span>
      <p className="flex justify-center my-6">
        <MdVerified style={{ fontSize: "5rem", color: "#03C04A" }} />
      </p>
      <button className="block border border-primary border-5 text-primary py-4 text-lg mt-7 rounded-lg w-[13rem]  relative left-[5rem] mb-2 hover:bg-primary hover:text-black duration-500">
        Go back to login page
      </button>
    </div>
  );
};

export default Successfullreset;
