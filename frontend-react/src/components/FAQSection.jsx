import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  HiOutlinePlus,
  HiOutlineMinus,
} from "react-icons/hi";

const faqData = [
  {
    question: "How does the AI generate email replies?",
    answer:
      "The application uses advanced AI models through OpenRouter API to analyze email content and generate context-aware professional replies instantly.",
  },
  {
    question: "Can I choose different reply tones?",
    answer:
      "Yes. You can generate replies in Professional, Friendly, Formal, or Casual tones depending on your communication style.",
  },
  {
    question: "Are my generated replies saved?",
    answer:
      "Yes. All generated replies are securely stored in your personal history section where you can view, edit, or delete them anytime.",
  },
  {
    question: "Is authentication secure?",
    answer:
      "Yes. The platform uses JWT authentication with protected routes to ensure secure user access and data privacy.",
  },
  {
    question: "Can I edit AI-generated replies?",
    answer:
      "Absolutely. You can modify generated responses before copying or sending them.",
  },
];

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-28 overflow-hidden"
    >

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-violet-600/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <p className="text-cyan-400 font-medium mb-4">
            FAQ
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            Everything you need to know about the AI Email Reply Generator platform.
          </p>

        </motion.div>

        {/* FAQ Items */}
        <div className="mt-16 space-y-6">

          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
            >

              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left px-8 py-6"
              >

                <span className="text-lg font-medium text-white">
                  {faq.question}
                </span>

                <div className="text-cyan-400 text-2xl">
                  {activeIndex === index ? (
                    <HiOutlineMinus />
                  ) : (
                    <HiOutlinePlus />
                  )}
                </div>

              </button>

              {/* Answer */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >

                    <div className="px-8 pb-6 text-gray-400 leading-relaxed text-lg">
                      {faq.answer}
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQSection;