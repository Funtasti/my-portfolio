import AboutDetail from "../pages/AboutDetail";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import PortfolioPage from "../pages/PortfolioPage";
import Navbar from "./Navbar";

export default function MainPage()  {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Home />
      <AboutDetail />
      <PortfolioPage />
      <Contact />
    </main>
  );
}
