import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div>
      <div className="flex justify-between items-center py-10">
        <div className="">
          <Link to="/">
            <button className="text-2xl font-medium">Blogit.</button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/?cat=art">
            <h6 className="text-lg">ART</h6>
          </Link>
          <Link to="/?cat=science">
            <h6 className="text-lg">SCIENCE</h6>
          </Link>
          <Link to="/?cat=technology">
            <h6 className="text-lg">TEHCHNOLOGY</h6>
          </Link>
          <Link to="/?cat=sport">
            <h6 className="text-lg">SPORT</h6>
          </Link>
          <Link to="/?cat=food">
            <h6 className="text-lg">FOOD</h6>
          </Link>
          <Link to="/profile">
            <span className="ml-3">{currentUser?.username}</span>
          </Link>
          {currentUser ? null : <Link to="/login">Login</Link>}
          <Link to="/profile">
            <span>
              <img
                className="w-10 rounded-full cursor-pointer"
                src="../profile-pic.jpg"
                alt=""
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
