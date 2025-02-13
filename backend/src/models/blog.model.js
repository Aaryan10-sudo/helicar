import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
  },
  date:{
    type: Date,
    default: Date.now,
  },
  seo: {
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    keywords: [{ type: String }],
  },
  isPublished: {
    type: Boolean,
    default: false
  }
},{
    timestamps: true,
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
