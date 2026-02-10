import { useState, useMemo } from 'react';
import cafeEvents from '../data/events';

function Events() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  }

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        currentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        day: d,
        currentMonth: true,
      });
    }

    // Next month leading days
    const remaining = 7 - (days.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        days.push({
          day: i,
          currentMonth: false,
        });
      }
    }

    return days;
  }, [year, month]);

  function getEventsForDay(day) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return cafeEvents.filter((e) => e.date === dateStr);
  }

  const monthEvents = useMemo(() => {
    return cafeEvents.filter((e) => {
      const d = new Date(e.date + 'T00:00:00');
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }, [year, month]);

  const displayedEvents = selectedDay
    ? getEventsForDay(selectedDay)
    : monthEvents;

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  function hasEvent(day) {
    return getEventsForDay(day).length > 0;
  }

  return (
    <>
      <section className="events-page-header">
        <h1>Upcoming Events</h1>
        <p>
          Join us for trivia nights, live music, themed evenings, and more.
          Check the calendar below to see what&apos;s coming up!
        </p>
      </section>

      <section className="calendar-section">
        <div className="calendar-container">
          <div className="calendar-nav">
            <button
              className="btn btn-gold calendar-prev"
              aria-label="Previous month"
              onClick={prevMonth}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <h2 className="calendar-month-year">
              {monthName} {year}
            </h2>
            <button
              className="btn btn-gold calendar-next"
              aria-label="Next month"
              onClick={nextMonth}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <div className="calendar-weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="calendar-grid">
            {calendarDays.map((cell, i) => (
              <div
                key={i}
                className={`calendar-day${!cell.currentMonth ? ' other-month' : ''}${isToday(cell.day) && cell.currentMonth && !selectedDay ? ' today' : ''}${hasEvent(cell.day) && cell.currentMonth ? ' has-event' : ''}${selectedDay === cell.day && cell.currentMonth ? ' selected' : ''}`}
                onClick={() => {
                  if (cell.currentMonth) {
                    setSelectedDay(selectedDay === cell.day ? null : cell.day);
                  }
                }}
              >
                {cell.day}
                {hasEvent(cell.day) && cell.currentMonth && (
                  <span className="event-dot"></span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="event-details-section">
        <h2 className="event-details-heading">
          {selectedDay ? `Events on ${monthName} ${selectedDay}` : `Events in ${monthName}`}
        </h2>
        <div className="event-details-grid">
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event, i) => {
              const eventDate = new Date(event.date + 'T00:00:00');
              const dateLabel = eventDate.toLocaleDateString('default', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              });
              return (
                <div className="event-detail-card" key={i}>
                  <div className="event-detail-icon">
                    <i className={event.icon}></i>
                  </div>
                  <h3>{event.name}</h3>
                  <p className="event-detail-date">{dateLabel}</p>
                  <p className="event-detail-time">{event.time}</p>
                </div>
              );
            })
          ) : (
            <p className="no-events">{selectedDay ? 'Sorry, no events currently scheduled' : 'Check back soon for scheduled events.'}</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Events;
