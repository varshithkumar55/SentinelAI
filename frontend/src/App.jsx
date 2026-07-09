import Navbar from "./components/layout/Navbar";
import Hero from "./components/landing/Hero";
import Workflow from "./components/landing/Workflow";
import Features from "./components/landing/Features";
function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <Hero />
        <Workflow />
        <Features />
      </main>
    </div>
  );
}

export default App;