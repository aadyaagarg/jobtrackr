import { useState } from "react";
import { FaGoogle, FaLinkedin, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiBriefcase, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import loginbg from "../assets/loginbg.png";
import authService from "../services/authService";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await authService.register(fullName, email, password);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f5f6fc] p-0 sm:p-4 md:p-6">
      <section className="mx-auto flex max-w-7xl overflow-hidden rounded-none bg-[#f8f9ff] shadow-sm sm:rounded-3xl md:min-h-170">
        {/* LEFT : SIGNUP FORM */}
        <div className="flex w-full items-center justify-center px-5 py-10 sm:px-8 md:w-1/2 md:px-12 lg:px-16">
          <div className="w-full max-w-97.5">
            {/* Logo */}
            <div className="mb-1 flex items-center gap-2">
              <FiBriefcase className="text-2xl text-[#007c72]" />
              <h1 className="text-2xl font-bold tracking-tight text-[#006f68] sm:text-3xl">
                JobTrackr
              </h1>
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#10253d]">
              Create an account
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              Start tracking your applications today.
            </p>

            {/* Form */}
            <form onSubmit={handleSignup} className="mt-8 space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-[#10253d]"
                >
                  Full Name
                </label>

                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#b5c4c7]" />

                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-9 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#007c72] focus:ring-1 focus:ring-[#007c72]"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-[#10253d]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#b5c4c7]" />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-9 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#007c72] focus:ring-1 focus:ring-[#007c72]"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-[#10253d]"
                >
                  Password
                </label>

                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#b5c4c7]" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-9 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#007c72] focus:ring-1 focus:ring-[#007c72]"
                    required
                    minLength={8}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#007c72]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters.
                </p>
              </div>
              <button
                type="submit"
                className=" cursor-pointer h-11 w-full rounded-md bg-[#007c72] text-xs font-bold text-white transition hover:bg-[#00655f]"
              >
                CREATE ACCOUNT
              </button>
            </form>
            <div className="my-5 flex items-center gap-3 text-[9px] font-semibold text-gray-500">
              <div className="h-px flex-1 bg-gray-200" />
              <span>OR CONTINUE WITH</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="cursor-pointer flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white text-xs text-gray-700 transition hover:bg-gray-50"
              >
                <FaGoogle className="text-[#4285F4]" />
                Google
              </button>

              <button
                type="button"
                className="cursor-pointer flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white text-xs text-gray-700 transition hover:bg-gray-50"
              >
                <FaLinkedin className="text-[#0A66C2]" />
                LinkedIn
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#007c72] hover:underline"
              >
                Sign in
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
          <div className="absolute bottom-8 left-1/2 z-10 w-[78%] max-w-97.5 -translate-x-1/2 rounded-xl bg-white/95 p-5 shadow-xl backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#008c80] text-lg text-white">
                💼
              </div>

              <div>
                <h3 className="text-base font-bold leading-5 text-[#10253d]">
                  Your Career Journey Starts Here
                </h3>

                <p className="mt-1 text-xs leading-4 text-gray-500">
                  Join thousands of job seekers landing their dream roles with
                  JobTrackr.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;
