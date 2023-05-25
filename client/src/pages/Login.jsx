import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      await axios.post("/auth/login", inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log(err.response.date);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className=" text-4xl text-gray-900 mb-5">Login</h1>
      <form className="flex flex-col p-12 bg-white w-80 gap-5 border border-gray-700 rounded-lg">
        <input
          className="p-3 border-b border-gray-800"
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          className="p-3 border-b border-gray-800"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button
          className="p-2 bg-green-600 text-white rounded-md text-base mt-4"
          onClick={handleSubmit}
        >
          Login
        </button>
        {err && <p className=" text-center text-red-600">{err}</p>}
        <span>
          Don't you have an account?{" "}
          <Link className=" underline" to="/register">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
