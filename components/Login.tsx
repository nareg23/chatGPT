"use client";
import { sign } from "crypto";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="bg-[#3bb5a9] flex flex-col justify-center items-center text-center h-screen">
      <Image height={300} width={300} src={"/logo.jpg"} alt="logo" />
      <button
        className="text-white font-bold text-3xl animate-pulse"
        onClick={() => {
          signIn("google");
        }}
      >
        Sign In to use GPT
      </button>
    </div>
  );
};

export default Login;
