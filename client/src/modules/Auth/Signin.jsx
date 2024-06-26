import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSignup, userSignin } from "src/features/authSlice";
import { useNavigate } from "react-router";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const loggedIn = useSelector((state) => state.auth.logged_in);

  useEffect(() => {
    if (!loggedIn) return;
    navigate("/user");
  }, [loggedIn]);

  const handleSingnin = () => {
    dispatch(userSignin(value));
  };

  return (
    <div className="w-full px-4 py-8 rounded-md bg-white shadow">
      <div className="mb-6">
        <p className="text-3xl font-extrabold text-center text-gray-700">
          Good To See You!
        </p>
        <p className="text-center text-sm font-medium text-gray-600">
          Let's Continue Your Journey!
        </p>
      </div>
      <div className="w-full mt-4 flex justify-start items-start flex-col">
        <input
          value={value.email}
          name="email"
          onChange={(e) => setValue({ ...value, email: e.target.value })}
          type="text"
          className="w-full px-3 py-4 text-sm mb-3 bg-slate-100 rounded text-gray-700 outline-none"
          placeholder="Enter Email ID"
        />
        <input
          value={value.password}
          name="password"
          onChange={(e) => setValue({ ...value, password: e.target.value })}
          type="password"
          className="w-full px-3 py-4 mb-1 text-sm bg-slate-100 rounded text-gray-700 outline-none"
          placeholder="Enter Password"
        />
        <p className="text-blue-600 text-sm font-medium text-right cursor-pointer">
          Forgot Password?
        </p>
        <button
          onClick={handleSingnin}
          className="p-3 mt-6 mb-1 font-medium text-gray-200 bg-blue-600 rounded w-full"
        >
          Sign In
        </button>

        <div className="flex justify-center mx-auto flex-col items-center mt-2 text-sm">
          <p className="text-gray-600 font-medium text-center">
            Don't have account?
          </p>
          <p
            onClick={() => dispatch(toggleSignup(true))}
            className="text-blue-600 font-medium cursor-pointer"
          >
            Signup
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
