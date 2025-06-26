"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const initialContent = { imageUrl: "", title: "", description: "" };
const initialBlog = {
  mainTitle: "",
  date: "",
  content: [initialContent],
};

const BlogAdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialBlog);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await axios.get("/blog");
    setBlogs(res.data.data);
  };

  const handleChange = (e, idx, field) => {
    if (typeof idx === "number") {
      const updatedContent = [...form.content];
      updatedContent[idx][field] = e.target.value;
      setForm({ ...form, content: updatedContent });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleImageDrop = (files, idx) => {
    const file = files[0];
    const imageUrl = URL.createObjectURL(file);
    const updatedContent = [...form.content];
    updatedContent[idx].imageUrl = imageUrl;
    setForm({ ...form, content: updatedContent });
  };

  const addContentItem = () => {
    setForm({ ...form, content: [...form.content, initialContent] });
  };

  const removeContentItem = (idx) => {
    const updatedContent = form.content.filter((_, i) => i !== idx);
    setForm({ ...form, content: updatedContent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `/blog/by-name?name=${encodeURIComponent(editTitle)}`,
          form
        );
      } else {
        await axios.post("/blog", form);
      }
      setForm(initialBlog);
      setEditMode(false);
      setEditTitle("");
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleEdit = (blog) => {
    setForm({
      mainTitle: blog.mainTitle,
      date: blog.date,
      content: blog.content || [],
    });
    setEditMode(true);
    setEditTitle(blog.mainTitle);
  };

  const handleDelete = async (mainTitle) => {
    if (!window.confirm("Delete this blog?")) return;
    await axios.delete(`/blog/by-name?name=${encodeURIComponent(mainTitle)}`);
    fetchBlogs();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        {editMode ? "Edit Blog Entry" : "Add Blog Entry"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6 items-start"
      >
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Main Title</label>
          <input
            name="mainTitle"
            className="w-full border px-3 py-2 rounded-md"
            value={form.mainTitle}
            onChange={handleChange}
            required
          />

          <label className="block text-sm font-medium mt-4 mb-1">Date</label>
          <input
            name="date"
            type="date"
            className="w-full border px-3 py-2 rounded-md"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium mb-2">Cover Image</label>
          <div className="w-full h-48 border-2 border-dashed flex items-center justify-center rounded-md text-sm text-gray-500">
            Drag & drop an image here, or click to select
          </div>
        </div>

        <div className="col-span-2">
          <h4 className="text-lg font-semibold mt-6 mb-2">Content Items</h4>
          {form.content.map((item, idx) => {
            const { getRootProps, getInputProps } = useDropzone({
              onDrop: (files) => handleImageDrop(files, idx),
              accept: { "image/*": [] },
              multiple: false,
            });

            return (
              <div
                key={idx}
                className="grid md:grid-cols-4 gap-4 p-4 border mb-4 rounded-md"
              >
                <div className="col-span-1">
                  <div
                    {...getRootProps()}
                    className="cursor-pointer border h-full flex items-center justify-center p-2 rounded-md text-center"
                  >
                    <input {...getInputProps()} />
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="w-full h-28 object-cover rounded"
                      />
                    ) : (
                      <p className="text-sm text-gray-500">Upload Image</p>
                    )}
                  </div>
                </div>
                <div className="col-span-3 flex flex-col gap-2">
                  <input
                    placeholder="Title"
                    className="border p-2 rounded w-full"
                    value={item.title}
                    onChange={(e) => handleChange(e, idx, "title")}
                    required
                  />
                  <textarea
                    placeholder="Description"
                    className="border p-2 rounded w-full"
                    value={item.description}
                    onChange={(e) => handleChange(e, idx, "description")}
                    required
                  />
                  {form.content.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContentItem(idx)}
                      className="text-red-500 text-sm mt-1 self-start"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <button
            type="button"
            onClick={addContentItem}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded text-sm"
          >
            + Add Section
          </button>
        </div>

        <div className="col-span-2 mt-6 flex justify-center gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            {editMode ? "Update Blog" : "Create Blog"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                setForm(initialBlog);
                setEditMode(false);
                setEditTitle("");
              }}
              className="bg-gray-400 text-white px-6 py-2 rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BlogAdminPage;
