import { useState } from 'react';
import locationImg from '../assets/img/milkyway-location.png';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email) {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    }
  }

  return (
    <>
      <div className="contact-map">
        <img src={locationImg} alt="Milky Way Cafe location on map" />
      </div>

      <h2 className="contact-heading">
        Get Directions to our Shop{' '}
        <i className="fa-solid fa-location-dot"></i>
      </h2>

      <div className="contact-body">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="first-name">First Name *</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
          />

          <label htmlFor="last-name">Last Name *</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={handleChange}
          />

          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="message">Messages or Comments</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="btn btn-purple">
            Submit
          </button>
        </form>

        <div className="contact-sidebar">
          <p>
            Have suggestions for us? Share your opinions, thoughts, and concerns
            here.
          </p>
          <p>Be sure to review us on Yelp too!</p>
          <a
            href="https://www.yelp.com/?dd_referrer="
            target="_blank"
            rel="noreferrer"
            aria-label="Yelp"
            className="yelp-icon"
          >
            <i className="fa-brands fa-yelp"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default Contact;
