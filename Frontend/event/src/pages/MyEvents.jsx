import React, { useEffect, useState } from "react";
import "./MyEvents.css";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="events-container">
      <h2 className="events-title">My Events</h2>

      {events.length === 0 ? (
        <p className="no-events">No events found.</p>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event._id} className="event-card">
              {event.image && (
                <div className="event-image-container">
                  <img
                    src={`https://mini-event-platform-nbts.onrender.com/uploads/${event.image}`}
                    alt={event.title}
                    className="event-image"
                  />
                </div>
              )}

              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.datetime).toLocaleString()}
                </p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Capacity:</strong> {event.capacity}</p>
              </div>

              <div className="event-actions">
                <button onClick={() => navigate("/")}>Join</button>
                <button onClick={() => navigate("/create")}>Leave</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
