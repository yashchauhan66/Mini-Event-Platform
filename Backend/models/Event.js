import mongoose from 'mongoose';


const eventSchema = new mongoose.Schema({
title: String,
description: String,
datetime: Date,
location: String,
capacity: Number,
isLive: { type: Boolean, default: false },
image: String

}, {
  timestamps: true
});


export default mongoose.model('Event', eventSchema);