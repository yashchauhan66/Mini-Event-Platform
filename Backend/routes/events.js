import express from 'express';
import Event from '../models/Event.js';
import auth from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);

  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});



const upload = multer({ storage });



router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});




router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    console.log(req.body); 
    const { title, description, datetime, location, capacity,image } = req.body;

    if (!title || !description || !datetime || !location) {
      return res.status(400).json({ message: "All fields required" });
    }

    

    const event = new Event({
      title,
      description,
      datetime,
      location,
      capacity: parseInt(capacity) || 100,
      attendees: [],
      image: req.file ? req.file.filename : null, 
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post('/:id/join', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.attendees.includes(req.userId))
      return res.status(400).json({ message: 'Already joined' });

    event.attendees.push(req.userId);
    await event.save();

    res.json({ message: 'Joined event', event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




router.post('/:id/leave', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.attendees = event.attendees.filter(id => id.toString() !== req.userId);
    await event.save();

    res.json({ message: 'Left event' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
