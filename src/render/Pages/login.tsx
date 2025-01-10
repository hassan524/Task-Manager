import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/main/firebase'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setemail] = useState<string | null>(null)
  const [pass, setpass] = useState<string | number | null>(null);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      localStorage.removeItem('IsHandlingAcount');
      localStorage.removeItem('isUserRegister');
      localStorage.setItem('isUserLogin', 'true');

      await signInWithEmailAndPassword(auth, email || "", String(pass));


      navigate('/home');
    } catch (error: any) {
      console.error("Login error:", error.message || error);
    }
  };

  return (
    <>
      <div
        className="absolute left-0 top-0 w-full h-[10vh] flex justify-end items-center custom-md:px-5 px-3"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <div>
          <Link to={'/Sign'}>
            <button className="rounded-3xl mt-3 px-5 py-[0.40rem] font-semibold text-primary bg-slate-50 text-xs">
              Sign up
            </button>
          </Link>
        </div>
      </div>
      <div className="h-64 mt-14 relative custom-md:right-[35px] rounded-3xl me">
        <form onSubmit={handleLogIn} className="flex flex-col gap-5 items-start justify-center">
          <input
            className="border-b text-sm py-3 tracking-wide sm:w-[30vw] bg-transparent w-[55vw] border-b-gray-300 text-gray-500 focus:outline-none"
            type="email"
            placeholder="Email"
            data-aos="zoom-in"
            data-aos-duration="1000"
            onChange={(e) => setemail(e.target.value)}
          />
          <div className="relative flex items-center sm:w-[30vw] w-[60vw] border-b border-b-gray-300"
            onFocus={() => setIsPasswordFocused(true)}>
            <input
              className="w-[90%] text-sm py-3 tracking-wide bg-transparent text-gray-500 focus:outline-none"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              data-aos="zoom-in"
              data-aos-duration="1000"
              onChange={(e) => setpass(e.target.value)}
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
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
