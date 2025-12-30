import React, { useEffect, useState } from "react";
import "./MyEvents.css";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="events-page">
      <h2 className="events-title">My Events</h2>

      {events.length === 0 ? (
        <p className="no-events">No events found</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              {event.image && (
                <div className="event-image-wrapper">
                  <img
                    src={`https://mini-event-platform-nbts.onrender.com/uploads/${event.image}`}
                    alt={event.title}
                    className="event-image"
                  />
                </div>
              )}

              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-desc">{event.description}</p>

                <div className="event-meta">
                  <span>
  {event.datetime
    ? new Date(event.datetime).toLocaleString()
    : "Date not available"}
</span>

                  <span> {event.location}</span>
                  <span> {event.capacity}</span>
                </div>

                <div className="event-actions">
                  <button className="btn primary" onClick={() => navigate("/")}>
                    Join
                  </button>
                  <button
                    className="btn secondary"
                    onClick={() => navigate("/create")}
                  >
                    Leave
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
