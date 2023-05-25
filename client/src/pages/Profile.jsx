import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);

  // Edit
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");

  const handleEditButton = () => {
    setEdit(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        img,
      });

      // Update user attributes in local storage
      const updatedUser = { ...currentUser, username, email, password, img };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/");
      window.location.reload(1000);
    } catch (err) {
      console.log(err);
    }
  };

  // Functions

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users/${currentUser.id}`);
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/users/${currentUser.id}`);
      console.log(res.data);
      localStorage.clear();
      navigate("/");
      window.location.reload(1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Write a Post</h1>
        <Link to="/write">
          <button className=" bg-green-600 text-white font-medium p-2 my-2 rounded-lg text-md">
            Write
          </button>
        </Link>
      </div>

      <span className=" mt-6 block w-full border"></span>

      <h1 className=" mt-6 font-semibold mb-6 text-xl">Settings</h1>

      <div className=" mt-6 flex justify-between items-center ml">
        <div className="flex flex-8 flex-col gap-6">
          <div className="flex items-center gap-2 text-lg">
            {currentUser.img ? (
              <img className="w-12 rounded-full" src={currentUser.img}></img>
            ) : (
              <img
                className="w-12 rounded-full"
                src="../profile-pic.jpg"
                alt="image2"
              />
            )}
            <div>
              <span className=" ml-1 font-semibold">
                {currentUser.username}
              </span>
              <p className="ml-1">Email: {currentUser.email}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-2 justify-end">
          {edit ? null : (
            <button
              className=" mr-10 border-2 border-green-600 rounded-lg p-2"
              onClick={handleEditButton}
            >
              Edit
            </button>
          )}

          <button
            className=" bg-white border-2 border-green-600 rounded-lg p-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <span className="mt-6 block w-full border"></span>

      {edit ? (
        <div>
          <h1 className=" mt-6 font-semibold text-xl">Edit</h1>
          <div className="mt-6">
            <form className="editForm">
              <input
                className="mr-6 p-2 border-b-2"
                required
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="mr-6 p-2 border-b-2"
                required
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="mr-6 p-2 border-b-2"
                required
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className=" border-2 border-green-600 rounded-lg p-1"
                onClick={handleEdit}
              >
                Edit
              </button>
            </form>
          </div>
          <span style={{ marginTop: "80px" }} className="span"></span>
        </div>
      ) : null}

      <div style={{ marginTop: "100px" }}>
        <Link to="/">
          <button
            className=" bg-green-600 text-white font-medium p-2 my-2 border-2 border-gray-900 rounded-lg text-md"
            onClick={logout}
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
