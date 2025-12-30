import { useState } from "react";
import API from "../api/api";
import "./CreateEvent.css";

export default function CreateEvent() {
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    datetime: "",
    location: "",
    capacity: 0,
  });

  const submit = async (e) => {
    e.preventDefault(); // prevent page reload
    if (!form.title || !form.description || !form.datetime || !form.location || !form.capacity) {
      return alert("Please fill all fields");
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("datetime", form.datetime);
    formData.append("location", form.location);
    formData.append("capacity", form.capacity);
    if (image) formData.append("image", image);

    try {
      await API.post("/events", formData); // Axios sets Content-Type automatically
      alert("Event created successfully!");
      window.location.href = "/";
    } catch (err) {
      console.error("Create Event Error:", err.response || err);
      alert("Failed to create event");
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="datetime-local"
          value={form.datetime}
          onChange={(e) => setForm({ ...form, datetime: e.target.value })}
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
