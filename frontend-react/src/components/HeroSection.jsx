import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Import your downloaded mockup image here
import heroMockup from "../assets/hero-mockup.png"; 

const words = [
  "Instantly",
  "with AI",
  "Smarter",
];

function HeroSection() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

 useEffect(() => {
  const currentWord = words[wordIndex];

  const timeout = setTimeout(() => {

    if (!isDeleting) {

      setText(currentWord.substring(0, text.length + 1));

      if (text === currentWord) {
        setTimeout(() => {
          setIsDeleting(true);
        }, 1200);
      }

    } else {

      setText(currentWord.substring(0, text.length - 1));

      if (text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }

    }

  }, isDeleting ? 60 : 120);

  return () => clearTimeout(timeout);

}, [text, isDeleting, wordIndex]);
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#030712]">

      {/* Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Generate
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}AI{" "}
              </span>
              Email Replies
              <br />
              <span className="text-cyan-400">
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 text-lg text-gray-400 leading-relaxed max-w-2xl">
              Save time and respond smarter with AI-generated email replies.
              Create professional, friendly, formal, or casual responses in seconds.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold shadow-xl shadow-violet-500/30"
                >
                  Get Started Free
                </motion.button>
              </Link>

              <Link to="/dashboard">
                <button className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition">
                  Open Dashboard
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            {/* Ambient Background Glow matching the UI mockup */}
            <div className="absolute w-[450px] h-[450px] bg-cyan-500/15 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

            {/* Modern Clean Image Wrapper */}
            <div className="relative w-full max-w-[580px] transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={heroMockup}
                alt="MailMaster AI Dashboard Mockup"
                className="w-full h-auto object-contain drop-shadow-[0_35px_35px_rgba(6,182,212,0.15)]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;