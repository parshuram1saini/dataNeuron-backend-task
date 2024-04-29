import mongoose from "mongoose";

// Define the schema for the data entry
const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  addCount: {
    type: Number,
    default: 0,
  },
  updateCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true // This will add createdAt and updatedAt timestamps
});

// Create the model from the schema
const User = mongoose.model("User", userSchema);

export default User;
