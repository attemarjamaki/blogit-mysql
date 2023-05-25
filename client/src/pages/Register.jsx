import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className=" text-4xl text-gray-900 mb-5">Register</h1>
      <form className="flex flex-col p-12 bg-white w-80 gap-5 border border-gray-700 rounded-lg">
        <input
          className="p-3 border-b border-gray-800"
          required
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          className="p-3 border-b border-gray-800"
          required
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="p-3 border-b border-gray-800"
          required
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          className="p-2 bg-green-600 text-white rounded-md text-base mt-4"
          onClick={handleSubmit}
        >
          Register
        </button>
        {error && <p className=" text-center text-red-600">{error}</p>}
        <span>
          Do you have an account?{" "}
          <Link className=" underline" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
