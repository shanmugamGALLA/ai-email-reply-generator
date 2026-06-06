import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-email-reply-generator-1gzs.onrender.com/api/",
});

export default api;