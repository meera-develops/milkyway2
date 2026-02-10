import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/milkyway-logo.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/our-story', label: 'Our Story' },
    { path: '/menu', label: 'Menu' },
    { path: '/events', label: 'Events' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar" ref={navRef}>
      <Link to="/" className="nav-brand">
        <img src={logo} alt="Milky Way Cafe Logo" />
        <span className="logo-text">
          <span className="milky-text">Milky</span> Way{' '}
          <span className="cafe-text">Cafe</span>
        </span>
      </Link>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar;
