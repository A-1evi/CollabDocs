import { FileText } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const handleGetStarted = () => {
    navigate("/login", { state: { showSignup: true } });
  };

  return (
    <header
      className={`w-full ${
        !isLoginPage
          ? "border-b border-gray-800 bg-[#1C1F26]"
          : "absolute top-0 left-0 right-0 z-50"
      }`}
    >
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <Link to={"/"} className="flex items-center space-x-2">
          <FileText
            className={`h-6 w-6 ${
              isLoginPage ? "text-white" : "text-[#6366F1]"
            }`}
          />
          <span className="text-xl font-semibold text-white">CollabDocs</span>
        </Link>
        {!isLoginPage && (
          <div className="ml-auto flex items-center space-x-4">
            <Link
              to="/login"
              className="btn bg-transparent hover:bg-[#6366F1]/10 text-[#6366F1] px-4 py-2 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <button
              onClick={handleGetStarted}
              className="btn bg-[#6366F1] hover:bg-[#5355E1] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
