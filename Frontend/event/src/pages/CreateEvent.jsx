import { useState } from 'react';
import API from '../api/api';
import './CreateEvent.css';

export default function CreateEvent() {
  const [image, setImage] = useState(null); // file state
  const [form, setForm] = useState({
    title: '',
    description: '',
    datetime: '',
    location: '',
    capacity: 0
  });

  const submit = async () => {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('datetime', form.datetime);
    formData.append('location', form.location);
    formData.append('capacity', form.capacity);
    if (image) formData.append('image', image); // append image file

    try {
      await API.post('/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('Failed to create event');
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>

      <input 
        placeholder="Title"
        onChange={e => setForm({ ...form, title: e.target.value })} 
      />

      <textarea 
        placeholder="Description"
        onChange={e => setForm({ ...form, description: e.target.value })} 
      />

      <input 
        type="datetime-local"
        onChange={e => setForm({ ...form, datetime: e.target.value })} 
      />

      <input 
        placeholder="Location"
        onChange={e => setForm({ ...form, location: e.target.value })} 
      />

      <input 
        type="number" 
        placeholder="Capacity"
        onChange={e => setForm({ ...form, capacity: Number(e.target.value) })} 
      />

      <input 
        type="file" 
        accept="image/*"
        onChange={e => setImage(e.target.files[0])} 
      />

      <button onClick={submit}>Create</button>
    </div>
  );
}
