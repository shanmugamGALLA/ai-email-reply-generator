import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import api from "../services/api";

function RegisterPage() {

  const navigate = useNavigate();

  // Auto Redirect If Already Logged In
  const token = localStorage.getItem("access_token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    security_question: "",
    security_answer: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    setLoading(true);
    setMessage("");

    // Password Match Validation
    if (formData.password !== formData.confirm_password) {

      setMessage("Passwords do not match");

      setLoading(false);

      return;
    }

    try {

      const response = await api.post(
        "/auth/register/",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          security_question: formData.security_question,
          security_answer: formData.security_answer,
        }
      );

      console.log(response.data);

      setMessage("Account created successfully!");

      setFormData({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        security_question: "",
        security_answer: "",
      });

      // Redirect To Login Page
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {

      console.error(error);

      if (error.response?.data?.error) {

        setMessage(error.response.data.error);

      } else {

        setMessage("Registration failed");
      }

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center px-6 py-20">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-400 mt-4">
            Start using ReplyAI today
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
          onSubmit={handleRegister}
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
              placeholder="Choose a username"
              className="w-full bg-[#131A2E] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              required
            />

          </div>

          {/* Email */}
          <div>

            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              placeholder="Create a password"
              className="w-full bg-[#131A2E] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              required
            />

          </div>

          {/* Confirm Password */}
          <div>

            <label className="block text-sm text-gray-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full bg-[#131A2E] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
              required
            />

          </div>
         
        {/* Security Question */}
<div>

  <label className="block text-sm text-gray-300 mb-2">
    Security Question
  </label>

  <select
    name="security_question"
    value={formData.security_question}
    onChange={handleChange}
    className="w-full bg-[#131A2E] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400"
    required
  >

    <option value="" className="bg-[#131A2E]">
      Select a security question
    </option>

    <option value="What is your favorite color?" className="bg-[#131A2E]">
      What is your favorite color?
    </option>

    <option value="What is your pet name?" className="bg-[#131A2E]">
      What is your pet name?
    </option>

    <option value="What is your birth city?" className="bg-[#131A2E]">
      What is your birth city?
    </option>

    <option value="What is your favorite teacher name?" className="bg-[#131A2E]">
      What is your favorite teacher name?
    </option>

  </select>

</div>

{/* Security Answer */}
<div>

  <label className="block text-sm text-gray-300 mb-2">
    Security Answer
  </label>

  <input
    type="text"
    name="security_answer"
    value={formData.security_answer}
    onChange={handleChange}
    placeholder="Enter your answer"
    className="w-full bg-[#131A2E] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
    required
  />

</div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-xl font-semibold hover:scale-[1.02] transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* Bottom Text */}
        <p className="text-center text-gray-400 mt-8">

          Already have an account?

          <Link
            to="/login"
            className="text-cyan-400 ml-2 hover:text-cyan-300"
          >
            Sign In
          </Link>

        </p>

      </div>

    </div>
  );
}

export default RegisterPage;