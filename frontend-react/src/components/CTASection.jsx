import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center">

        <div className="w-[500px] h-[500px] bg-violet-600/20 blur-[140px] rounded-full"></div>

      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 md:p-16 text-center overflow-hidden"
        >

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-cyan-500/10"></div>

          {/* Content */}
          <div className="relative z-10">

            <p className="text-cyan-400 font-medium mb-4">
              START USING AI TODAY
            </p>

            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">

              Write Better
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}Email Replies{" "}
              </span>
              in Seconds

            </h2>

            <p className="mt-8 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Experience a smarter way to handle emails with AI-powered reply generation,
              multiple tone styles, and seamless workflow productivity.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">

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

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default CTASection;