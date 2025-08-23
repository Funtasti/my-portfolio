import AboutDetail from "./pages/AboutDetail"
import Hero from "./components/Hero"
import MainAbout from "./pages/MainAbout"
import Navbar from "./components/Navbar"
import Contact from "./pages/Contact"
import PortfolioPage from "./pages/PortfolioPage"
// import Welcome from "./pages/Welcome"

function App() {

  return (
    <div className="min-h-screen">
      {/* <Welcome /> */}
      <Navbar />
      <Hero />
      <MainAbout />
      <AboutDetail />
      <PortfolioPage />
      <Contact />
    </div>
    
  )
}

export default App
