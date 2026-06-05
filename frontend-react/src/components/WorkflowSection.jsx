import { motion } from "framer-motion";

const workflowSteps = [
  {
    number: "01",
    title: "Paste Your Email",
    description:
      "Simply paste the received email into the AI generator dashboard.",
  },
  {
    number: "02",
    title: "Choose Reply Tone",
    description:
      "Select Professional, Friendly, Formal, or Casual response style.",
  },
  {
    number: "03",
    title: "Generate AI Reply",
    description:
      "Our AI instantly creates a polished and context-aware email response.",
  },
  {
    number: "04",
    title: "Copy & Send",
    description:
      "Copy the generated reply, edit if needed, and send it confidently.",
  },
];

function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="relative py-28 overflow-hidden"
    >

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/10 blur-[140px] rounded-full"></div>

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
            HOW IT WORKS
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Generate Smart Replies in 4 Simple Steps
          </h2>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            A streamlined workflow designed to help you respond to emails
            faster, smarter, and more professionally.
          </p>

        </motion.div>

        {/* Timeline */}
        <div className="mt-24 relative">

          {/* Center Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-violet-500/40 to-cyan-500/40 -translate-x-1/2"></div>

          <div className="space-y-16">

            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col lg:flex-row items-center gap-10 ${
                  index % 2 === 0
                    ? "lg:flex-row"
                    : "lg:flex-row-reverse"
                }`}
              >

                {/* Content */}
                <div className="flex-1">

                  <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-violet-500/30 transition duration-300">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20">

                        {step.number}

                      </div>

                      <h3 className="text-2xl font-semibold text-white">
                        {step.title}
                      </h3>

                    </div>

                    <p className="mt-6 text-gray-400 leading-relaxed text-lg">
                      {step.description}
                    </p>

                  </div>

                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:flex w-6 h-6 rounded-full bg-cyan-400 border-4 border-[#0B1120] absolute left-1/2 -translate-x-1/2"></div>

                {/* Empty Side */}
                <div className="flex-1 hidden lg:block"></div>

              </motion.div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

export default WorkflowSection;