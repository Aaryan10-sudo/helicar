import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    user: {
      name: String,
      email: String,
      website: String,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    rating: {
      overall: Number,
      driving: Number,
      interiorLayout: Number,
      spacePracticality: Number,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
2;
const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
