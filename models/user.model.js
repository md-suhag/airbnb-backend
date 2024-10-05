const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["guest", "host", "admin"],
    default: "guest",
  },
  profileImage: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    city: String,
    state: String,
    country: String,
    zipCode: String,
  },
  bookings: [
    {
      propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
      startDate: Date,
      endDate: Date,
      totalPrice: Number,
    },
  ],
  reviews: [
    {
      propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  languages: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
