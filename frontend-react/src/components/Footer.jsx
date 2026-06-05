function Footer() {
  return (
    <footer className="relative border-t border-white/10 overflow-hidden">

      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Branding */}
          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">

                <span className="text-white font-bold text-lg">
                  AI
                </span>

              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  ReplyGen
                </h2>

                <p className="text-gray-400 text-sm">
                  AI Email Reply Generator
                </p>

              </div>

            </div>

            <p className="mt-6 text-gray-400 leading-relaxed max-w-md">
              Generate professional and context-aware email replies instantly
              using advanced AI-powered assistance.
            </p>

          </div>

          {/* Navigation */}
          <div className="flex flex-col md:items-end">

            <div className="flex flex-wrap gap-6 text-gray-400">

              <a
                href="#features"
                className="hover:text-white transition"
              >
                Features
              </a>

              <a
                href="#workflow"
                className="hover:text-white transition"
              >
                Workflow
              </a>

              <a
                href="#benefits"
                className="hover:text-white transition"
              >
                Benefits
              </a>

              <a
                href="#faq"
                className="hover:text-white transition"
              >
                FAQ
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 ReplyGen. All rights reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Built with React, Django & AI
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;