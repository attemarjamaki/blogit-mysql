import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        console.log(res.data);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="flex">
      <div className="mt-12 flex-col gap-28">
        {posts.map((post) => (
          <div
            className="flex gap-20 [&:nth-child(2n+1)]:flex-row-reverse border rounded-lg p-4 m-4"
            key={post.id}
          >
            <div className="flex-2 relative">
              <img
                className="min-h-96 max-h-96 w-full object-cover"
                src={`../upload/${post.img}`}
                alt="img"
              />
            </div>
            <div className="flex flex-3 flex-col justify-between">
              <Link className="link" to={`/post/${post.id}`}>
                <h1 className="text-2xl font-semibold">{post.title}</h1>
              </Link>
              <p className="text-lg">{getText(post.desc).slice(0, 150)}...</p>
              <Link to={`/post/${post.id}`}>
                <button className=" bg-green-600 text-white font-medium p-2 my-2 rounded-lg text-sm ">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
