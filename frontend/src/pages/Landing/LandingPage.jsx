import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/landing/Hero";
import Workflow from "../../components/landing/Workflow";
import Features from "../../components/landing/Features";
import About from "../../components/landing/About";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <Hero />

        <section id="technology">
          <Workflow />
        </section>

        <section id="features">
          <Features />
        </section>

        <section id="about">
          <About />
        </section>
      </main>
    </div>
  );
}

export default LandingPage;