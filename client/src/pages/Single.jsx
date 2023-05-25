import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

function Single() {
  const [post, setPost] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex gap-12">
      <div className="flex flex-col gap-7 w-4/6">
        <img
          className="w-full h-72 object-cover"
          src={`../upload/${post?.img}`}
          alt="image"
        />
        <div className="flex items-center gap-2 text-xs mt-2 mb-4 py-3 ">
          {post.userImg ? (
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={post.userImg}
            ></img>
          ) : (
            <img
              className="w-12 h-12 rounded-full object-cover"
              src="../profile-pic.jpg"
              alt="image2"
            />
          )}
          <div className="">
            <span className="font-semibold text-base">{post.username}</span>
            <p className="m-0">Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="flex gap-2">
              <Link to={`/write?edit=2`} state={post}>
                <AiFillEdit className="h-6 w-6" color="blue" />
              </Link>

              <Link to={``}>
                <AiFillDelete
                  className="h-6 w-6"
                  color="red"
                  onClick={handleDelete}
                />
              </Link>
            </div>
          )}
        </div>
        <h1 className="text-xl font-semibold mb-4">{post.title}</h1>
        <p
          className="text-justify leading-7 mb-20"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>
      <div className="flex-1 flex-col gap-6">
        <Menu cat={post.cat} />
      </div>
    </div>
  );
}

export default Single;
