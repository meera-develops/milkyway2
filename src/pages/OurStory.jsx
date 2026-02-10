import { Link } from 'react-router-dom';
import stockImageCafe from '../assets/img/stock-image-cafe.png';
import socialmedia from '../assets/img/socialmedia.png';
import community from '../assets/img/community.png';

function OurStory() {
  return (
    <>
      <section className="story-intro">
        <img src={stockImageCafe} alt="Inside Milky Way Cafe" />
        <div className="story-intro-text">
          <h2>Our Story</h2>
          <p>
            We started as just some kids with a dream. As students ourselves, we
            knew what it&apos;s like to spend long hours grinding away at the coffee
            shop. You start to know the baristas better than your own family.
          </p>
          <p>
            What started as a small pop-up at local markets quickly grew into a
            full-fledged cafe right in the heart of Orlando.
          </p>
          <p>
            At Milky Way Cafe, it&apos;s not just about the drinks -- it&apos;s about
            bringing people together. Whether you&apos;re grabbing a quick latte,
            settling in for a late-night study session, or catching up with
            friends, we want you to feel right at home.
          </p>
          <p>
            Our goal with Milky Way Cafe is to totally reimagine your concept of
            what a cafe can be.
          </p>
        </div>
      </section>

      <section className="socials-section">
        <div className="socials-text">
          <h2>Socials</h2>
          <p>
            Stay connected with us on social media! We share our latest drinks,
            events, and behind-the-scenes moments. Follow along to be part of
            the <strong>Milky Way Galaxy</strong>
          </p>
          <a
            href="https://www.instagram.com/stardustie/?hl=en"
            target="_blank"
            rel="noreferrer"
            className="btn btn-purple"
          >
            Follow Us
          </a>
        </div>
        <div className="socials-image">
          <a
            href="https://www.instagram.com/stardustie/?hl=en"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={socialmedia}
              alt="Milky Way Cafe social media post"
            />
          </a>
        </div>
      </section>

      <section className="values-section">
        <h2>
          Here&apos;s what sets us apart.
          <br />
          We hold events like:
        </h2>
        <div className="values-grid">
          <Link to="/events" className="value-pill">
            Trivia
          </Link>
          <Link to="/events" className="value-pill">
            Arts &amp; Crafts
          </Link>
          <Link to="/events" className="value-pill">
            Silent Study Sections
          </Link>
          <Link to="/events" className="value-pill">
            Open Mic Nights
          </Link>
        </div>
      </section>

      <section className="community-section">
        <div className="community-image">
          <img src={community} alt="Latte art and community" />
        </div>
        <div className="community-text">
          <h2>A New Way</h2>
          <p>
            We know how much cafes mean to you. That&apos;s why we took our experience
            and built a better cafe. One meant to meet your needs and support
            you. Come stop by Milky Way Cafe anytime and see what sets us apart.
          </p>
          <Link to="/menu" className="btn btn-purple">
            View Menu
          </Link>
        </div>
      </section>
    </>
  );
}

export default OurStory;
