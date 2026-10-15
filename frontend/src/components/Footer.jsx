import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-[#10253d]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-white"
            >
              Job<span className="text-[#4fcfc4]">Trackr</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#c3ccd5]">
              Keep track of your job applications, stay organized, and stay
              focused on landing your next opportunity.
            </p>
          </div>
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-[#4fcfc4]">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-white transition hover:text-[#4fcfc4]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-sm text-white transition hover:text-[#4fcfc4]"
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="text-sm text-white transition hover:text-[#4fcfc4]"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-[#4fcfc4]">
              Support
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-white transition hover:text-[#4fcfc4]"
                >
                  Help
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="text-sm text-white transition hover:text-[#4fcfc4]"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="text-sm text-white transition hover:text-[#4fcfc4]"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-[#29405a] pt-6">
          <p className="text-xs text-[#9eabb8]">
            © 2026 JobTrackr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
