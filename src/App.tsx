import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <div className="app">
      <header className="w-full border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <Navbar />
        </div>
      </header>

      <main className="flex-1 w-full">
         <Outlet />
      </main>

      <footer className="w-full bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-6">
          <Footer />
        </div>
      </footer>
    </div>
  );
}

export default App;
