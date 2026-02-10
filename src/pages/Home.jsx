import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/img/hero-img.png';
import coffeeBeans from '../assets/img/coffee-beans.png';
import cafeEvents from '../data/events';

function Home() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const trackRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setCardsToShow(window.innerWidth <= 768 ? 1 : 3);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, cafeEvents.length - cardsToShow);

  function prevSlide() {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  }

  function nextSlide() {
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  }

  const slidePercent = -(carouselIndex * (100 / cardsToShow));
  const offset = `${slidePercent}%`;

  return (
    <>
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-content">
          <h1>
            NOT JUST
            <br />
            COFFEE
          </h1>
          <p>
            At Milky Way Cafe, we&apos;re dedicated to providing a one-of-a-kind
            experience. Our cozy atmosphere is the perfect place to enjoy your
            morning coffee, study with friends, or relax after a long day.
          </p>
          <p>
            We feature specialty drinks tailored to every season, delicious
            pastries, and special events every week. All our coffee beans are
            sourced straight from local roasters.
          </p>
          <Link to="/menu" className="btn btn-gold">
            View Menu
          </Link>
        </div>
      </section>

      <section
        className="highlights-section"
        style={{ backgroundImage: `url(${coffeeBeans})` }}
      >
        <div className="highlights-grid">
          <div className="highlight-card">
            <div className="highlight-icon">
              <i className="fa-solid fa-mug-hot"></i>
            </div>
            <h3>Specialty Drinks</h3>
            <p>
              Seasonal lattes, handcrafted mochas, and our signature Milky Way
              blend.
            </p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">
              <i className="fa-solid fa-cookie-bite"></i>
            </div>
            <h3>Fresh Pastries</h3>
            <p>Croissants, muffins, and paninis baked fresh every morning.</p>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <h3>Sustainability</h3>
            <p>Our beans are sourced straight from UCF&apos;s Arboretum</p>
          </div>
        </div>
      </section>

      <section className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-carousel">
          <button
            className="carousel-arrow carousel-prev"
            aria-label="Previous events"
            onClick={prevSlide}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="carousel-track-wrapper">
            <div
              className="carousel-track"
              ref={trackRef}
              style={{ transform: `translateX(${offset})` }}
            >
              {cafeEvents.map((event, index) => {
                const eventDate = new Date(event.date + 'T00:00:00');
                const month = eventDate.toLocaleString('default', {
                  month: 'short',
                });
                const day = eventDate.getDate();
                return (
                  <div className="event-card" key={index}>
                    <div className="event-card-icon">
                      <i className={event.icon}></i>
                    </div>
                    <h3>{event.name}</h3>
                    <p className="event-date">
                      {month} {day}
                    </p>
                    <p className="event-time">{event.time}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            className="carousel-arrow carousel-next"
            aria-label="Next events"
            onClick={nextSlide}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;
