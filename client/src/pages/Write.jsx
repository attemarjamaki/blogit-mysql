import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

function Write() {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState(state?.img || "");
  const [cat, setCat] = useState(state?.cat || "");
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImg(file);
    setSelectedImg(URL.createObjectURL(file));
  };

  const handleCatChange = (e) => {
    const val = e.target.value;
    setCat(val);
    console.log(val);
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: img ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: img ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="mt-10 flex gap-5">
        <div className=" flex-1 flex flex-col gap-5">
          <input
            className="p-3 border border-gray-400"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className=" h-80">
            <ReactQuill
              className=" h-full"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className=" flex flex-col gap-5 w-52">
          <div className="border border-gray-400 p-3 flex flex-col justify-between text-sm text-gray-900">
            <h1 className="text-lg mb-1">Preview</h1>

            <img className="w-full h-32 object-cover" src={selectedImg} />

            <input
              style={{ display: "none" }}
              type="file"
              name=""
              id="file"
              onChange={handleImageUpload}
            />

            <div className="flex justify-between mt-2 gap-4">
              {state ? (
                <label className=" underline text-lg" htmlFor="file">
                  Change Image
                </label>
              ) : (
                <label className="underline text-lg" htmlFor="file">
                  Upload Image
                </label>
              )}
            </div>
          </div>
          <div className="border border-gray-400 p-3">
            <h1 className=" mb-2 text-lg">Category</h1>
            <div className="flex items-center gap-1 text-gray-800 pt-0.5">
              <input
                type="radio"
                checked={cat === "art"}
                name="cat"
                value="art"
                id="art"
                onChange={handleCatChange}
              />
              <label htmlFor="art">Art</label>
            </div>
            <div className="flex items-center gap-1 text-gray-800 pt-0.5">
              <input
                type="radio"
                checked={cat === "science"}
                name="cat"
                value="science"
                id="science"
                onChange={handleCatChange}
              />
              <label htmlFor="science">Science</label>
            </div>
            <div className="flex items-center gap-1 text-gray-800 pt-0.5">
              <input
                type="radio"
                checked={cat === "technology"}
                name="cat"
                value="technology"
                id="technology"
                onChange={handleCatChange}
              />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="flex items-center gap-1 text-gray-800 pt-0.5">
              <input
                type="radio"
                checked={cat === "sport"}
                name="cat"
                value="sport"
                id="sport"
                onChange={handleCatChange}
              />
              <label htmlFor="sport">Sport</label>
            </div>
            <div className="flex items-center gap-1 text-gray-800 pt-0.5">
              <input
                type="radio"
                checked={cat === "food"}
                name="cat"
                value="food"
                id="food"
                onChange={handleCatChange}
              />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </div>
      <button
        className="flex mt-5  bg-green-600 text-white font-medium p-2 border-2 rounded-lg text-md"
        onClick={handleSubmit}
      >
        Publish
      </button>
    </div>
  );
}

export default Write;
