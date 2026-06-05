import { motion } from "framer-motion";

const benefits = [
  {
    title: "Respond Faster",
    description:
      "Generate polished email replies within seconds and reduce manual effort significantly.",
  },
  {
    title: "Professional Communication",
    description:
      "Create well-structured and context-aware responses that sound professional every time.",
  },
  {
    title: "Boost Productivity",
    description:
      "Focus on important tasks while AI handles repetitive email drafting efficiently.",
  },
  {
    title: "Flexible Reply Styles",
    description:
      "Switch easily between Professional, Friendly, Formal, and Casual tones instantly.",
  },
];

function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative py-28 overflow-hidden"
    >

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >

          <p className="text-cyan-400 font-medium mb-4">
            WHY CHOOSE US
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Designed to Make Email Communication Effortless
          </h2>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            AI-powered tools that help you reply smarter, communicate better,
            and save valuable time every day.
          </p>

        </motion.div>

        {/* Benefits Grid */}
        <div className="mt-20 grid lg:grid-cols-2 gap-8">

          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group relative"
            >

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

              {/* Card */}
              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-violet-500/30 transition duration-300 h-full">

                {/* Number */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/20">

                  0{index + 1}

                </div>

                {/* Title */}
                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-gray-400 leading-relaxed text-lg">
                  {benefit.description}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default BenefitsSection;