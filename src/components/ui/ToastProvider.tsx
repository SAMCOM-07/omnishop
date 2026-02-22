"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1500}
    //   pauseOnHover
    //   theme="colored"
      hideProgressBar
      closeButton={false}
      className='font-bold text-sm mx-auto pt-6 px-12 container rounded-md'
    />
  );
}