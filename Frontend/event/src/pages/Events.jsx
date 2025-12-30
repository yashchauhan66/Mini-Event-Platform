import { useEffect, useState } from "react";
import "./Events.css";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(
      "https://app.ticketmaster.com/discovery/v2/events.json?apikey=uhvwdGpZSUgIbMSZhLykIu7hbV0oby0q"
    )
      .then(res => res.json())
      .then(data => {
        console.log("API RESPONSE ", data); 
        setEvents(data._embedded?.events || []);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>

      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <img
                src={event.images?.[0]?.url}
                alt={event.name}
              />

              <h3>{event.name}</h3>

              <p>
                {event.dates?.start?.localDate}
              </p>

              <p>
                {event._embedded?.venues?.[0]?.name}
              </p>

              <button>View Event</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
