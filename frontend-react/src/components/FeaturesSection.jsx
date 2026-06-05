import { motion } from "framer-motion";

import {
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineAdjustments,
  HiOutlineLightningBolt,
} from "react-icons/hi";

const features = [
  {
    icon: <HiOutlineSparkles />,
    title: "AI Reply Generation",
    description:
      "Generate intelligent and context-aware email replies instantly using advanced AI models.",
  },
  {
    icon: <HiOutlineAdjustments />,
    title: "Multiple Reply Tones",
    description:
      "Choose between Professional, Friendly, Formal, or Casual reply styles easily.",
  },
  {
    icon: <HiOutlineClock />,
    title: "Save Time",
    description:
      "Reduce manual typing and generate polished responses within seconds.",
  },
  {
    icon: <HiOutlineDocumentText />,
    title: "Reply History",
    description:
      "Access, edit, and manage all previously generated AI replies anytime.",
  },
  {
    icon: <HiOutlineShieldCheck />,
    title: "Secure Authentication",
    description:
      "JWT-based authentication ensures protected and user-specific access.",
  },
  {
    icon: <HiOutlineLightningBolt />,
    title: "Fast Performance",
    description:
      "Optimized backend and frontend provide smooth and responsive user experience.",
  },
];

function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-28 overflow-hidden"
    >

      {/* Glow Effects */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-violet-600/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >

          <p className="text-cyan-400 font-medium mb-4">
            FEATURES
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Everything You Need to Reply Faster with AI
          </h2>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            Powerful AI-driven tools designed to help you generate
            professional email replies quickly and efficiently.
          </p>

        </motion.div>

        {/* Features Grid */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative"
            >

              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

              {/* Card */}
              <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition duration-300 hover:border-violet-500/30">

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-lg shadow-violet-500/20">

                  {feature.icon}

                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;