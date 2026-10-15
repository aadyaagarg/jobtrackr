import { useState } from "react";
import { FaGoogle, FaLinkedin, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiBriefcase, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import loginbg from "../assets/loginbg.png";
import useAuth from "../contexts/AuthContext";
import authService from "../services/authService";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f5f6fc] p-0 sm:p-4 md:p-6">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl overflow-hidden rounded-none bg-[#f8f9ff] shadow-sm sm:min-h-0 sm:rounded-3xl md:min-h-170">
        {/* LEFT : LOGIN FORM */}
        <div className="flex w-full items-center justify-center px-5 py-10 sm:px-8 md:w-1/2 md:px-12 lg:px-16">
          <div className="w-full max-w-97.5">
            <div className="mb-1 flex items-center gap-2">
              <FiBriefcase className="text-2xl text-[#007c72]" />

              <h1 className="text-2xl font-bold tracking-tight text-[#006f68] sm:text-3xl">
                JobTrackr
              </h1>
            </div>

            <p className="mb-9 text-sm text-gray-700">
              Welcome back! Please enter your details to continue.
            </p>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium text-gray-800"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-[#007c72] focus:ring-1 focus:ring-[#007c72]"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-medium text-gray-800"
                >
                  Password
                </label>

                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="h-11 w-full rounded-md border border-gray-300 bg-white px-9 pr-10 text-sm text-gray-800 outline-none transition focus:border-[#007c72] focus:ring-1 focus:ring-[#007c72]"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#007c72]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <label className="flex cursor-pointer items-center gap-1.5 text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 accent-[#007c72]"
                  />
                  Remember me
                </label>

                <Link
                  to="/"
                  className="font-semibold text-[#007c72] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="cursor-pointer h-11 w-full rounded-md bg-[#007c72] text-sm font-semibold text-white transition hover:bg-[#00655f]"
              >
                Sign In →
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3 text-xs text-gray-400">
              <div className="h-px flex-1 bg-gray-200" />
              <span>or</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <button
              type="button"
              className="cursor-pointer flex h-10 w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <FaGoogle className="text-[#4285F4]" />
              Sign in with Google
            </button>
            <button
              type="button"
              className="cursor-pointer mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <FaLinkedin className="text-[#0A66C2]" />
              Sign in with LinkedIn
            </button>

            {/* Signup */}
            <p className="mt-7 text-center text-xs text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#007c72] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT : IMAGE */}
        <div className="relative hidden w-1/2 overflow-hidden md:block">
          <img
            src={loginbg}
            alt="CareerTrack workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/15" />

          {/* Floating Career Card */}
          <div className="absolute left-1/2 top-1/2 z-10 w-[70%] max-w-95 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/95 p-5 shadow-xl backdrop-blur-sm">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#008c80] text-white">
                ↗
              </div>

              <div>
                <h2 className="text-base font-bold text-gray-800">
                  Your next career move starts here.
                </h2>

                <p className="mt-1 text-xs leading-4 text-gray-500">
                  Track applications, prepare for interviews, and land your
                  dream job with structured workflows and actionable insights.
                </p>
              </div>
            </div>

            {/* Upcoming Interview */}
            <div className="rounded-lg border border-gray-200 bg-[#f8f9ff] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase text-gray-500">
                  Upcoming Interview
                </span>

                <span className="rounded-full bg-[#dff4ef] px-2 py-1 text-[9px] font-semibold text-[#007c72]">
                  Tomorrow, 10:00 AM
                </span>
              </div>

              <h3 className="mt-2 text-sm font-bold text-gray-700">
                Senior Product Designer
              </h3>

              <p className="text-xs text-gray-500">TechFlow Innovations</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
