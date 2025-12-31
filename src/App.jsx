import Navbar from "./components/Navbar";
import ScanForm from "./components/ScanForm";
import Footer from "./components/Footer";
import Features from "./components/Features";
//import Hero from "./components/Hero";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        
        <header className="header">
          <h1>🔒 Phishing URL Scanner</h1>
          <p>Analyze a website link to detect phishing attempts</p>
        </header>
        
        <section className="card" style={{ textAlign: "center" }} size = "large" border = "true">
          <ScanForm />
        </section>
      </div>
      <Features />
      <Footer />
    </div>
  );
}

export default App;
