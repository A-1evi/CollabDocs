import React, { useState, useEffect } from "react";
import OAuth from "../components/OAuth";
import { useDispatch } from "react-redux";
import { register, login } from "../utils/Store/slices/authSlice";
import { useLocation, useNavigate } from "react-router";
import LoginBG from "../assets/LoginBG.jpeg";

const LoginRegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [animation, setAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    login: { email: "", password: "" },
    register: {
      name: "",
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // Set initial form state based on navigation
    if (location.state?.showSignup) {
      setIsLogin(false);
    }
  }, [location.state]);

  const handleOnChange = (formType, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [formType]: {
        ...prevData[formType],
        [name]: value,
      },
    }));
  };

  const validateSignupForm = () => {
    const { register } = formData;
    if (!register.name || !register.email || !register.password) {
      setError("Please fill in all fields");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnimation(true);
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        await dispatch(login(formData.login)).unwrap();
        navigate("/");
      } else {
        if (!validateSignupForm()) {
          setIsLoading(false);
          return;
        }
        await dispatch(register(formData.register)).unwrap();
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
      setAnimation(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1C1F26] relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${LoginBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "0.5",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div
          className={`flex flex-col bg-[#262A33]/90 backdrop-blur-sm shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full transition-all duration-500 transform ${
            animation ? "scale-105 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-white">
            {isLogin ? "Login To Your Account" : "Sign Up With Your Account "}
          </div>
          {error && (
            <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
          )}
          <OAuth isLogin={isLogin} />
          <div className="relative mt-10 h-px bg-gray-600">
            <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
              <span className="bg-[#262A33] px-4 text-xs text-gray-400 uppercase">
                {isLogin ? "Or Login With Email" : "Or Signup with Email"}
              </span>
            </div>
          </div>
          <div className="mt-10">
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="name"
                    className="mb-1 text-xs sm:text-sm tracking-wide text-gray-300"
                  >
                    Username:
                  </label>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-200">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.register.name}
                      onChange={(e) => handleOnChange("register", e)}
                      className="text-sm sm:text-base text-white placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                      placeholder="Username"
                    />
                  </div>
                </div>
              )}
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-300"
                >
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-200">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={
                      isLogin ? formData.login.email : formData.register.email
                    }
                    onChange={(e) =>
                      handleOnChange(isLogin ? "login" : "register", e)
                    }
                    className="text-sm sm:text-base text-white placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="E-Mail Address"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-300"
                >
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-200">
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={
                      isLogin
                        ? formData.login.password
                        : formData.register.password
                    }
                    onChange={(e) =>
                      handleOnChange(isLogin ? "login" : "register", e)
                    }
                    className="text-sm sm:text-base text-white placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center mb-6 -mt-4">
                <div className="flex ml-auto">
                  <a
                    href="#"
                    className="inline-flex text-xs sm:text-sm text-[#c2c2f5] hover:text-blue-700"
                  >
                    {isLogin ? "Forgot Your Password?" : ""}
                  </a>
                </div>
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-[#6366F1] hover:bg-[#5355E1] rounded-lg py-2 w-full transition duration-150 ease-in ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span className="mr-2 uppercase">
                    {isLoading
                      ? "Processing..."
                      : isLogin
                      ? "Login"
                      : "Sign up"}
                  </span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={toggleForm}
              className="inline-flex items-center  text-[#c2c2f5] hover:text-[#5355E1] text-xs text-center transition-colors"
            >
              <span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </span>
              <span className="ml-2 text-md">
                {isLogin
                  ? "You don't have an account?"
                  : "Already a member. Sign In"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
