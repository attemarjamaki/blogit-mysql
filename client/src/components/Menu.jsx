import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Menu({ cat }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        const shuffledPosts = res.data.sort(() => 0.5 - Math.random());
        const randomPosts = shuffledPosts.slice(0, 3);
        setPosts(randomPosts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="flex-col gap-6">
      <h1 className="text-md font-semibold text-gray-900 mb-6">
        Other posts you may like
      </h1>
      {posts.map((post) => (
        <div className="flex flex-col gap-2" key={post.id}>
          <img
            className=" w-full h-48 object-cover"
            src={`../upload/${post?.img}`}
            alt=""
          />
          <h2 className=" text-gray-800">{post.title}</h2>
          <Link to={`/post/${post.id}`}>
            <button className=" bg-green-600 text-white font-medium p-2 mt-2 mb-6 rounded-lg text-sm">
              Read More
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Menu;
