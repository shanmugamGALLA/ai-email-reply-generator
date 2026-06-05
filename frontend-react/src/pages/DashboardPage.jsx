import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function DashboardPage() {

  const navigate = useNavigate();

  const [emailContent, setEmailContent] = useState("");

  const [tone, setTone] = useState("professional");

  const [generatedReply, setGeneratedReply] = useState("");

  const [loading, setLoading] = useState(false);

  const username =
    localStorage.getItem("username");

  const handleCopy = async (text) => {

    try {

      await navigator.clipboard.writeText(text);

      alert("Reply copied successfully!");

    } catch (error) {

      console.error(error);

      alert("Failed to copy reply");
    }
  };

  const handleGenerateReply = async () => {

    if (!emailContent.trim()) {

      alert("Please enter email content");
      return;
    }

    setLoading(true);

    try {

      const token = localStorage.getItem("access_token");

      const response = await api.post(
        "/email/generate/",
        {
          email_content: emailContent,
          tone: tone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGeneratedReply(
        response.data.data.generated_reply
      );

   } catch (error) {

  console.error(error);

    // Backend custom message
  if (error.response?.data?.message) {

    alert(error.response.data.message);

  }
  // Internet / server connection issue
  else if (
    error.message.includes("Network Error") ||
    error.code === "ERR_NETWORK"
  ) {

    alert(
      "Internet connection lost. Please check your network and try again."
    );

  }

  // Backend server error
  else if (error.response?.status >= 500) {

    alert(
      "Server is temporarily unavailable. Please try again later."
    );

  }

  // Other errors
  else {

    alert(
      "Failed to generate AI reply. Please try again."
    );
  }

} finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-white px-6 pt-28 pb-10 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full"></div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto mb-10">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          {/* Left */}
          <div>

            <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-3">
              DASHBOARD
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Welcome to ReplyAI
            </h1>

            <p className="text-gray-400 mt-4 text-lg max-w-2xl">
              Generate professional AI-powered email replies instantly with a modern productivity workflow.
            </p>

          </div>

          {/* Right */}
          <div className="flex items-center gap-5">

            {/* History Button */}
            <button
              onClick={() => navigate("/history")}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 px-7 py-3 rounded-2xl font-semibold hover:scale-[1.03] transition shadow-2xl shadow-cyan-500/30"
            >
              History
            </button>

            {/* User Profile */}
<div className="relative overflow-hidden bg-gradient-to-br from-[#131A2E] to-[#1A2340] border border-cyan-500/20 rounded-3xl px-7 py-5 shadow-2xl shadow-cyan-500/10">

  {/* Glow */}
  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-3xl rounded-full"></div>

  <div className="relative z-10">

    <p className="text-xs uppercase tracking-[0.25em] text-cyan-400 mb-2">
      Active User
    </p>

    <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
      {username || "User"}
    </h3>

  </div>

</div>

             

          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-start">

        {/* Left Side */}
        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Email Generator
          </h2>

          {/* Email Input */}
          <div className="mb-6">

            <label className="block text-sm text-gray-300 mb-3">
              Original Email
            </label>

            <textarea
              rows="12"
              disabled={loading}
              value={emailContent}
              onChange={(e) =>
                setEmailContent(e.target.value)
              }
              placeholder="Paste your email here..."
              className="w-full bg-[#131A2E] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 resize-none leading-8"
            ></textarea>

          </div>

          {/* Tone */}
          <div className="mb-8">

            <label className="block text-sm text-gray-300 mb-3">
              Select Tone
            </label>

            <select
              disabled={loading}
              value={tone}
              onChange={(e) =>
                setTone(e.target.value)
              }
              className="w-full bg-[#131A2E] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400"
            >

              <option value="professional">
                Professional
              </option>

              <option value="friendly">
                Friendly
              </option>

              <option value="formal">
                Formal
              </option>

              <option value="casual">
                Casual
              </option>

            </select>

          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerateReply}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >

            {loading
              ? "Generating AI Reply..."
              : "Generate Reply"}

          </button>

        </div>

        {/* Right Side */}
        <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-8">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold">
              Generated Reply
            </h2>

            {generatedReply && (
              <button
                onClick={() =>
                  handleCopy(generatedReply)
                }
                className="text-sm bg-cyan-500/20 border border-cyan-500/30 hover:bg-cyan-500/30 transition px-4 py-2 rounded-xl text-cyan-300"
              >
                Copy Reply
              </button>
            )}

          </div>

          {!generatedReply ? (

            <div className="flex items-center justify-center text-center text-gray-500 border border-dashed border-white/10 rounded-3xl p-10 min-h-[420px]">

              Generate an AI reply to see the result here.

            </div>

          ) : (

            <div className="bg-[#131A2E] border border-white/10 rounded-3xl p-6 min-h-[420px]">

              <p className="text-gray-300 whitespace-pre-wrap leading-9 text-[15px]">
                {generatedReply}
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;