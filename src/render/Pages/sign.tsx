import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "@/main/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

const Sign = () => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [pass, setPass] = useState<string | number | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !pass) {
      toast.error("Sign-Up Failed", {
        description: "Please fill in all fields before signing up.",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email || "",
        String(pass)
      );
      const userUid = userCredential.user.uid;

      await setDoc(doc(db, "users", userUid), {
        name,
        email,
      });

      localStorage.setItem("isUserRegister", "true");
      toast.success("Sign-Up Successful", {
        description: "Your account has been created. Redirecting to login...",
      });

      setTimeout(() => navigate("/login"), 1500); // Navigate after a short delay
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error("Sign-Up Failed", {
        description:
          error.message || "Something went wrong. Please try again later.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div
        className="absolute left-0 top-0 w-full h-[10vh] flex justify-end items-center custom-md:px-5 px-3"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <Link to="/login">
          <button className="rounded-3xl mt-3 px-5 py-[0.40rem] font-semibold text-primary bg-slate-50 text-xs">
            Log In
          </button>
        </Link>
      </div>

      <div className="h-64 mt-14 relative custom-md:right-[35px] rounded-3xl me">
        <form
          onSubmit={handleSignIn}
          className="flex flex-col gap-7 items-start justify-center"
        >
          <input
            className="border-b py-3 text-sm tracking-wide sm:w-[30vw] bg-transparent w-[55vw] border-b-gray-200 text-gray-500 focus:outline-none"
            type="text"
            placeholder="Username"
            data-aos="zoom-in"
            data-aos-duration="1000"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border-b py-3 text-sm tracking-wide sm:w-[30vw] bg-transparent w-[60vw] border-b-gray-200 text-gray-500 focus:outline-none"
            type="email"
            placeholder="Email"
            data-aos="zoom-in"
            data-aos-duration="1000"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div
            className="relative text-sm flex items-center sm:w-[30vw] w-[65vw] border-b border-b-gray-200"
            onFocus={() => setIsPasswordFocused(true)}
          >
            <input
              className="w-[90%] py-3 text-sm tracking-wide bg-transparent text-gray-500 focus:outline-none"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              data-aos="zoom-in"
              data-aos-duration="1000"
              onChange={(e) => setPass(e.target.value)}
            />
            {isPasswordFocused && (
              <div className="w-[10%] flex items-center justify-center">
                {passwordVisible ? (
                  <i
                    className="bi bi-eye-slash cursor-pointer"
                    onClick={togglePasswordVisibility}
                  ></i>
                ) : (
                  <i
                    className="bi bi-eye cursor-pointer"
                    onClick={togglePasswordVisibility}
                  ></i>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-primary text-sm rounded-3xl mt-3 px-8 py-2 font-semibold text-slate-50"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default Sign;
