
import React from "react";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-violet-100 to-blue-50">
      <div className="max-w-md w-full rounded-xl shadow-xl bg-white p-8 flex flex-col items-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1c76b562a1a146688b16ac6584a89363/8d57d3330a663501866598decc78666e8126d2f9?placeholderIfAbsent=true"
          alt="Orbit ERP Logo"
          className="w-20 h-20 mb-2"
        />
        <h1 className="text-2xl font-bold text-violet-700 mt-2 mb-1 text-center">
          Welcome to Orbit ERP
        </h1>
        <p className="text-gray-500 mb-8 text-center">
          The all-in-one ERP solution for Non-Governmental Organizations. Streamline your fundraising, manage opportunities, and power your impact.
        </p>
        <form className="w-full flex flex-col gap-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
              Organization Email
            </label>
            <input
              id="email"
              type="email"
              disabled
              value=""
              className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-gray-50"
              placeholder="you@yourorg.org"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              disabled
              value=""
              className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-gray-50"
              placeholder="********"
            />
          </div>
          <button
            type="button"
            disabled
            className="mt-2 bg-violet-600 text-white font-semibold rounded-md py-2 hover:bg-violet-700 transition-all cursor-not-allowed"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 w-full flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-2">
            Powered by <span className="text-violet-600 font-bold">Orbit</span> for NGOs
          </span>
          <span className="text-xs text-gray-300">Module-based ERP | Secure | Scalable</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
