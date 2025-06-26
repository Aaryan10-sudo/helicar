"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { baseURL } from "@/config/config";

const initialContent = { imageUrl: "", title: "", description: "" };
const initialBlog = {
  mainTitle: "",
  date: "",
  coverImage: "",
  content: [initialContent],
};

function ContentItem({
  item,
  idx,
  onImageDrop,
  onChange,
  onRemove,
  canRemove,
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => onImageDrop(files, idx),
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="grid md:grid-cols-4 gap-4 p-4 border mb-4 rounded-md">
      <div className="col-span-1">
        <div
          {...getRootProps()}
          className={`cursor-pointer border h-full flex items-center justify-center p-2 rounded-md text-center ${
            isDragActive ? "border-blue-500 bg-blue-50" : ""
          }`}
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
          onChange={(e) => onChange(e, idx, "title")}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded w-full"
          value={item.description}
          onChange={(e) => onChange(e, idx, "description")}
          required
        />
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="text-red-500 text-sm mt-1 self-start"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

const BlogAdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialBlog);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${baseURL}/blog/`);
      setBlogs(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCoverDrop = async (files) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await axios.post(`${baseURL}/file/single`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = res.data.result;
      setCoverPreview(imageUrl);
      setForm((prev) => ({ ...prev, coverImage: imageUrl }));
    } catch (err) {
      alert("Cover image upload failed.");
    }
  };

  const handleImageDrop = async (files, idx) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("document", file);

    try {
      const res = await axios.post(`${baseURL}/file/single`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = res.data.result;
      const updatedContent = [...form.content];
      updatedContent[idx].imageUrl = imageUrl;
      setForm((prev) => ({ ...prev, content: updatedContent }));
    } catch (err) {
      alert("Content image upload failed.");
    }
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

  const addContentItem = () => {
    setForm({ ...form, content: [...form.content, initialContent] });
  };

  const removeContentItem = (idx) => {
    const updatedContent = form.content.filter((_, i) => i !== idx);
    setForm({ ...form, content: updatedContent });
  };

  console.log(form);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `${baseURL}/blog/by-name?name=${encodeURIComponent(editTitle)}`,
          form
        );
      } else {
        await axios.post(`${baseURL}/blog/`, form);
      }
      setForm(initialBlog);
      setCoverPreview("");
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
      coverImage: blog.coverImage || "",
      content:
        Array.isArray(blog.content) && blog.content.length > 0
          ? blog.content
          : [initialContent],
    });
    setCoverPreview(blog.coverImage || "");
    setEditMode(true);
    setEditTitle(blog.mainTitle);
  };

  const handleDelete = async (mainTitle) => {
    if (!window.confirm("Delete this blog?")) return;
    await axios.delete(`${baseURL}/blog/by-name?name=${mainTitle}`);
    fetchBlogs();
  };

  const {
    getRootProps: getCoverRootProps,
    getInputProps: getCoverInputProps,
    isDragActive: isCoverDragActive,
  } = useDropzone({
    onDrop: handleCoverDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

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
          <div
            {...getCoverRootProps()}
            className={`w-full h-48 border-2 border-dashed flex items-center justify-center rounded-md text-sm text-gray-500 cursor-pointer ${
              isCoverDragActive ? "border-blue-500 bg-blue-50" : ""
            }`}
          >
            <input {...getCoverInputProps()} />
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span>Drag & drop an image here, or click to select</span>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <h4 className="text-lg font-semibold mt-6 mb-2">Content Items</h4>
          {(form.content || []).map((item, idx) => (
            <ContentItem
              key={idx}
              item={item}
              idx={idx}
              onImageDrop={handleImageDrop}
              onChange={handleChange}
              onRemove={removeContentItem}
              canRemove={(form.content || []).length > 1}
            />
          ))}
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
                setCoverPreview("");
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

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">All Blogs</h3>
        {loading ? (
          <p>Loading blogs...</p>
        ) : (
          <ul>
            {(Array.isArray(blogs) ? blogs : []).map((blog) => (
              <li
                key={blog.mainTitle}
                className="mb-4 border-b pb-2 flex justify-between items-center"
              >
                <span>
                  <b>{blog.mainTitle}</b> ({blog.date})
                </span>
                <span>
                  <button
                    className="text-blue-600 mr-4"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(blog.mainTitle)}
                  >
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlogAdminPage;
