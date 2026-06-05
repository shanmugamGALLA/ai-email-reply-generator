import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function HistoryPage() {

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  // Edit states
  const [editingId, setEditingId] = useState(null);

  const [editedReply, setEditedReply] = useState("");

  // Fetch history
  const fetchHistory = async () => {

    try {

      const token =
        localStorage.getItem("access_token");

      const response = await api.get(
        "/email/history/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(response.data.data);

    } catch (error) {

      console.error(error);

      alert("Failed to fetch history");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Copy
  const handleCopy = async (text) => {

    try {

      await navigator.clipboard.writeText(text);

      alert("Reply copied successfully!");

    } catch (error) {

      console.error(error);

      alert("Failed to copy reply");
    }
  };

  // Delete
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reply?"
    );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("access_token");

      await api.delete(
        `/email/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory((prev) =>
        prev.filter((item) => item.id !== id)
      );

    } catch (error) {

      console.error(error);

      alert("Failed to delete reply");
    }
  };

  // Start edit
  const handleEdit = (item) => {

    setEditingId(item.id);

    setEditedReply(item.generated_reply);
  };

  // Cancel edit
  const handleCancelEdit = () => {

    setEditingId(null);

    setEditedReply("");
  };

  // Update reply
  const handleUpdate = async (id) => {

    try {

      const token =
        localStorage.getItem("access_token");

      await api.put(
        `/email/${id}/`,
        {
          generated_reply: editedReply,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                generated_reply: editedReply,
              }
            : item
        )
      );

      setEditingId(null);

      setEditedReply("");

      alert("Reply updated successfully!");

    } catch (error) {

      console.error(error);

      alert("Failed to update reply");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-white px-6 pt-28 pb-10">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-3">
              HISTORY
            </p>

            <h1 className="text-4xl md:text-5xl font-bold">
              Generated Replies
            </h1>

            <p className="text-gray-400 mt-4 text-lg">
              View, edit, copy, and manage all AI-generated replies.
            </p>

          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 rounded-2xl font-semibold hover:scale-[1.03] transition shadow-lg shadow-cyan-500/30"
          >
            Back to Dashboard
          </button>

        </div>

      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">

        {loading ? (

          <div className="text-center text-gray-400 py-20">
            Loading history...
          </div>

        ) : history.length === 0 ? (

          <div className="bg-white/10 border border-white/10 rounded-3xl p-10 text-center text-gray-400">
            No generated replies found.
          </div>

        ) : (

          <div className="space-y-6">

            {history.map((item) => (

              <div
                key={item.id}
                className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-[32px] p-8"
              >

                {/* Top */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                  <span className="text-xs uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-xl w-fit">
                    {item.tone}
                  </span>

                  <div className="flex flex-wrap items-center gap-3">

                    <button
                      onClick={() =>
                        handleCopy(item.generated_reply)
                      }
                      className="text-sm bg-cyan-500/20 border border-cyan-500/30 hover:bg-cyan-500/30 transition px-4 py-2 rounded-xl text-cyan-300"
                    >
                      Copy
                    </button>

                    {editingId === item.id ? (

                      <>
                        <button
                          onClick={() =>
                            handleUpdate(item.id)
                          }
                          className="text-sm bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 transition px-4 py-2 rounded-xl text-green-300"
                        >
                          Save
                        </button>

                        <button
                          onClick={handleCancelEdit}
                          className="text-sm bg-gray-500/20 border border-gray-500/30 hover:bg-gray-500/30 transition px-4 py-2 rounded-xl text-gray-300"
                        >
                          Cancel
                        </button>
                      </>

                    ) : (

                      <button
                        onClick={() =>
                          handleEdit(item)
                        }
                        className="text-sm bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30 transition px-4 py-2 rounded-xl text-purple-300"
                      >
                        Edit
                      </button>

                    )}

                    <button
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      className="text-sm bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition px-4 py-2 rounded-xl text-red-300"
                    >
                      Delete
                    </button>

                  </div>

                </div>

                {/* Original Email */}
                <div className="mb-6">

                  <h3 className="text-lg font-semibold mb-3">
                    Original Email
                  </h3>

                  <div className="bg-[#131A2E] border border-white/10 rounded-2xl p-6">

                    <p className="text-gray-400 whitespace-pre-wrap leading-8">
                      {item.original_email}
                    </p>

                  </div>

                </div>

                {/* Generated Reply */}
                <div>

                  <h3 className="text-lg font-semibold mb-3">
                    Generated Reply
                  </h3>

                  <div className="bg-[#131A2E] border border-white/10 rounded-2xl p-6">

                    {editingId === item.id ? (

                      <textarea
                        rows="10"
                        value={editedReply}
                        onChange={(e) =>
                          setEditedReply(e.target.value)
                        }
                        className="w-full bg-transparent text-gray-300 focus:outline-none resize-none leading-8"
                      />

                    ) : (

                      <p className="text-gray-300 whitespace-pre-wrap leading-8">
                        {item.generated_reply}
                      </p>

                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default HistoryPage;