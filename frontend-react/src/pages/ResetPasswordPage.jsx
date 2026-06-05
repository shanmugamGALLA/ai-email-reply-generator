import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function ResetPasswordPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    security_answer: "",
    new_password: "",
    confirm_password: "",
  });

  const [securityQuestion, setSecurityQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch Security Question
  const handleGetQuestion = async () => {

    if (!formData.username) {
      setMessage("Please enter username");
      return;
    }

    setLoading(true);

    setMessage("");

    try {

      const response = await api.post(
        "/auth/security-question/",
        {
          username: formData.username,
        }
      );

      setSecurityQuestion(
        response.data.security_question
      );

    } catch (error) {

      console.error(error);

      if (error.response?.data?.error) {

        setMessage(error.response.data.error);

      } else {

        setMessage("Failed to fetch security question");
      }

    } finally {

      setLoading(false);
    }
  };

  // Reset Password
  const handleResetPassword = async (e) => {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    // Password Validation
    if (
      formData.new_password !==
      formData.confirm_password
    ) {

      setMessage("Passwords do not match");

      setLoading(false);

      return;
    }

    try {

      const response = await api.post(
        "/auth/reset-password/",
        {
          username: formData.username,
          security_answer: formData.security_answer,
          new_password: formData.new_password,
        }
      );

      setMessage(response.data.message);

      setFormData({
        username: "",
        security_answer: "",
        new_password: "",
        confirm_password: "",
      });

      setSecurityQuestion("");

      // Redirect To Login
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      console.error(error);

      if (error.response?.data?.error) {

        setMessage(error.response.data.error);

      } else {

        setMessage("Password reset failed");
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

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-white">
            Reset Password
          </h1>

          <p className="text-gray-400 mt-4">
            Recover your account securely
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
          onSubmit={handleResetPassword}
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

          {/* Get Question Button */}
          {!securityQuestion && (
            <button
              type="button"
              onClick={handleGetQuestion}
              disabled={loading}
              className="w-full bg-white/10 border border-white/10 py-4 rounded-xl text-white hover:bg-white/20 transition"
            >
              {loading
                ? "Loading..."
                : "Get Security Question"}
            </button>
          )}

          {/* Security Question */}
          {securityQuestion && (
            <div className="bg-[#131A2E] border border-white/10 rounded-xl px-4 py-4 text-white">
              {securityQuestion}
            </div>
          )}

          {/* Security Answer */}
          {securityQuestion && (
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
          )}

          {/* New Password */}
          {securityQuestion && (
            <div>

              <label className="block text-sm text-gray-300 mb-2">
                New Password
              </label>

              <input
                type="password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full bg-[#131A2E] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                required
              />

            </div>
          )}

          {/* Confirm Password */}
          {securityQuestion && (
            <div>

              <label className="block text-sm text-gray-300 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full bg-[#131A2E] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                required
              />

            </div>
          )}

          {/* Reset Button */}
          {securityQuestion && (
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-xl font-semibold hover:scale-[1.02] transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {loading
                ? "Resetting Password..."
                : "Reset Password"}
            </button>
          )}

        </form>

        {/* Bottom Text */}
        <p className="text-center text-gray-400 mt-8">

          Back to Login

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

export default ResetPasswordPage;