import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBag } from '../components/BagContext';

function getTimeSlots() {
  const day = new Date().getDay(); // 0 = Sun, 6 = Sat
  const isWeekend = day === 0 || day === 6;
  const startMinutes = isWeekend ? 10 * 60 : 8 * 60;
  const endMinutes = isWeekend ? 26 * 60 : 25 * 60; // past midnight

  const slots = [];
  for (let t = startMinutes; t <= endMinutes; t += 15) {
    const wrapped = t % (24 * 60);
    const h = Math.floor(wrapped / 60);
    const m = wrapped % 60;
    const period = h < 12 ? 'AM' : 'PM';
    const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
    slots.push(`${displayH}:${m.toString().padStart(2, '0')} ${period}`);
  }
  return slots;
}

const timeSlots = getTimeSlots();

function Checkout() {
  const { bagItems, clearBag } = useBag();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', pickupTime: timeSlots[0] });
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const subtotal = bagItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setConfirmedOrder({ ...form, items: bagItems, subtotal });
    clearBag();
    setConfirmed(true);
  }

  if (confirmed && confirmedOrder) {
    return (
      <section className="checkout-page">
        <div className="checkout-confirmation">
          <div className="confirmation-icon"><i className="fa-solid fa-circle-check"></i></div>
          <h1>Order Placed!</h1>
          <p className="confirmation-sub">
            Thanks, {confirmedOrder.name}! We'll have your order ready at <strong>{confirmedOrder.pickupTime}</strong>.
          </p>
          <div className="confirmation-summary">
            <h2>Order Summary</h2>
            {confirmedOrder.items.map((item) => (
              <div className="confirmation-item" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="confirmation-total">
              <span>Total</span>
              <span>${confirmedOrder.subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button className="btn btn-gold" onClick={() => { window.scrollTo(0, 0); navigate('/events'); }}>View Upcoming Events</button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <h1 className="checkout-heading">Checkout</h1>

      <div className="checkout-body">
        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          {bagItems.length === 0 ? (
            <>
              <p className="checkout-empty-msg">Your bag is empty.</p>
              <button className="btn btn-gold" onClick={() => navigate('/menu')}>
                Browse Menu
              </button>
            </>
          ) : (
            <>
              {bagItems.map((item) => (
                <div className="checkout-summary-item" key={item.id}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="checkout-subtotal">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {/* Pickup Form */}
        {bagItems.length > 0 && (
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Pickup Details</h2>

            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="pickupTime">Pickup Time</label>
            <select
              id="pickupTime"
              name="pickupTime"
              value={form.pickupTime}
              onChange={handleChange}
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>

            <button type="submit" className="btn btn-gold checkout-submit-btn">
              Place Order
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Checkout;
