import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B1020] text-white overflow-hidden relative">

      {/* Background Glow Effects */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="fixed top-[200px] right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      <Navbar />

      <main className="relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;