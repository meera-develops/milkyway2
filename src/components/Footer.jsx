function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h3>Address</h3>
          <p>
            1201 University Blvd, Suite 201
            <br />
            Orlando, FL 32817
          </p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>
            407-288-288
            <br />
            milkywaycafe@gmail.com
          </p>
        </div>
        <div>
          <h3>Hours</h3>
          <p>
            Mon - Fri: 8am - 1am
            <br />
            Sat - Sun: 10am - 2am
          </p>
        </div>
        <div>
          <h3>Follow Us</h3>
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/stardustie/?hl=en"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.instagram.com/stardustie/?hl=en"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2026 Milky Way Cafe. <br />
        Fictious cafe produced for DIG4503 at UCF by{' '}
        <a
          href="https://github.com/meera-develops"
          target="_blank"
          rel="noreferrer"
        >
          Meera Bhola
        </a>
      </div>
    </footer>
  );
}

export default Footer;
