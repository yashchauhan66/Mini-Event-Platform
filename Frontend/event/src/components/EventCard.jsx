import './EventCard.css';

const EventCard = ({ event, onJoin, onLeave, joined }) => {
  const eventDate = event.date
    ? new Date(event.date).toLocaleDateString()
    : 'Date not available';

  return (
    <div className="event-card">
      <img
        src={event.image || 'https://via.placeholder.com/400x200'}
        alt={event.title}
      />

      <div className="content">
        <h3>{event.title}</h3>
        <p className="desc">{event.description}</p>

        <div className="meta">
          <span> {event.location || 'Online'}</span>
          <span> {eventDate}</span>
          <span>
            👥 {event.attendees?.length || 0}/{event.capacity || 0}
          </span>
        </div>

        {joined ? (
          <button className="leave" onClick={() => onLeave(event._id)}>
            Leave Event
          </button>
        ) : (
          <button onClick={() => onJoin(event._id)}>
            Join Event
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
