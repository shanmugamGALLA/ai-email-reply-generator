import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import api from "../services/api";

function LoginPage() {

  const navigate = useNavigate();

  // Auto Redirect If Already Logged In
  const token = localStorage.getItem("access_token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post(
        "/auth/login/",
        formData
      );

      // Store Tokens
      localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      // Store Username
      localStorage.setItem(
        "username",
        formData.username
      );

      setMessage("Login successful!");

      console.log(response.data);

      // Redirect To Dashboard
      window.location.href = "/dashboard";

    } catch (error) {

      console.error(error);

      if (error.response?.data?.detail) {
        setMessage(error.response.data.detail);
      } else {
        setMessage("Login failed");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center px-6 py-20">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-gray-400 mt-4">
            Sign in to continue using ReplyAI
          </p>

        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-center text-white">
            {message}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* Username */}
          <div>

            <label className="block text-sm text-gray-300 mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full bg-[#131A2E] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              required
            />

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-[#131A2E] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              required
            />

          </div>

          {/* Forgot Password */}
          <div className="flex justify-end -mt-2">

            <Link
              to="/reset-password"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-xl font-semibold hover:scale-[1.02] transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        {/* Bottom Text */}
        <p className="text-center text-gray-400 mt-8">

          Don’t have an account?

          <Link
            to="/register"
            className="text-cyan-400 ml-2 hover:text-cyan-300"
          >
            Register
          </Link>

        </p>

      </div>
    </div>
  );
}

export default LoginPage;