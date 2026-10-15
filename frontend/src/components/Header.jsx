import { Link, useNavigate } from "react-router";
import useAuth from "../contexts/AuthContext";
import authService from "../services/authService";

function Header() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const loggedInItems = [
    { name: "Dashboard", url: "/dashboard" },
    { name: "My Applications", url: "/" },
    { name: "Profile", url: "/" },
  ];
  const loggedOutItems = [
    { name: "Home", url: "/" },
    { name: "Sign In", url: "/login" },
    { name: "Sign Up", url: "/signup" },
  ];
  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    navigate("/login");
  };
  const navItems = isAuthenticated ? loggedInItems : loggedOutItems;
  return (
    <header className="bg-white px-6 py-4 md:px-12">
      <nav className="mx-auto flex max-w-7xl items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-[#006f68] cursor-pointer"
        >
          JobTrackr
        </Link>
        <ul className="ml-auto flex items-center gap-1 md:gap-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.url}
                className="rounded-md px-4 py-2 text-sm font-medium text-[#10253d] transition duration-200 hover:bg-[#f5f6fc] hover:text-[#007c72]"
              >
                {item.name}
              </Link>
            </li>
          ))}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="ml-2 rounded-md bg-[#007c72] px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-[#00655f]"
            >
              Logout
            </button>
          ) : (
            <li>
              <Link
                to="/signup"
                className="ml-2 rounded-md bg-[#007c72] px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-[#00655f]"
              >
                Get Started
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
