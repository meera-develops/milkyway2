import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Menu from './pages/Menu';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import { BagProvider } from './components/BagContext';
import BagDrawer from './components/BagDrawer';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {

  return (
    <Router>
      <ScrollToTop />
      <BagProvider>
        <Navbar />
        <BagDrawer />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
      </BagProvider>
    </Router>
  );
}

export default App;
