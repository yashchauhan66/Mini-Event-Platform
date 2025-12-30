import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
  },
  { timestamps: true }
);


rsvpSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.model('RSVP', rsvpSchema);
