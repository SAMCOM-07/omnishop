"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
    //   pauseOnHover
    //   theme="colored"
      className='font-bold text-sm '
    />
  );
}
