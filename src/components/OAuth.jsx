import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { googleAuth } from "../utils/Store/slices/authSlice";
import { useNavigate } from "react-router";

const OAuth = ({ isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const userData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      const response = await dispatch(googleAuth(userData)).unwrap();

      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during Google sign in:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200"
    >
      <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
      </span>
      <span>{isLogin ? "Login with Google" : "Signup with Google"}</span>
    </button>
  );
};

export default OAuth;
