import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=uhvwdGpZSUgIbMSZhLykIu7hbV0oby0q`
    )
      .then(res => res.json())
      .then(data => setEvent(data));
  }, [id]);

  if (!event) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <img src={event.images?.[0]?.url} style={{ width: "100%", borderRadius: 12 }} />
      <h1>{event.name}</h1>
      <p>{event.dates.start.localDate}</p>
      <p>{event._embedded?.venues?.[0]?.name}</p>

      <button style={{ padding: 12, marginTop: 20 }}>
        Join Live Event
      </button>
    </div>
  );
}
