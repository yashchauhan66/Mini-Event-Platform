import React, { useEffect, useState } from "react";
import "./MyEvents.css";
import { useNavigate } from "react-router-dom";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="events-container">
      <h2 className="events-title">My Events (Created & Joined)</h2>

      {events.length === 0 ? (
        <p className="no-events">No events found.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h3 className="event-title">{event.title}</h3>

              <p className="event-description">
                {event.description}
              </p>

              <p className="event-datetime">
                <strong>Date & Time:</strong>{" "}
                {new Date(event.date).toLocaleString()}
              </p>

              <p className="event-place">
                <strong>Location:</strong> {event.location}
              </p>

              <p>
                <strong>Capacity:</strong> {event.capacity}
              </p>
              <img 
               src={`https://mini-event-platform-nbts.onrender.com/${event.image}`} 

               alt={event.title} 
      style={{ width: '200px', borderRadius: '8px' }} 
             />


              <div className="event-actions">
                <button onClick={() => navigate("/")}>Join Event</button>
         <button onClick={() => navigate("/create")}>Leave</button>
            
                
               </div>
              
            
            </div>
          ))}
        </div>
      )}
    </div>
  );

}
