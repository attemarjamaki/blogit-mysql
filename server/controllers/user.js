import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Get user
export const getUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "SELECT `username`, `email`, `img`, `id` FROM users WHERE id = ? ";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data[0]);
    });
  });
};

// Delete a user
export const deleteUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const userId = req.params.id;
    const q = "DELETE FROM users WHERE `id` = ? ";

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(403).json("You can delete only your profile!");

      return res.json("User has been deleted!");
    });
  });
};

// Update a user
export const updateUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const userId = req.params.id;
    const q =
      "UPDATE users SET `username`=?,`email`=?,`password`=?, `img` =? WHERE `id` = ?";

    const values = [req.body.username, req.body.email, hash, req.body.img];

    db.query(q, [...values, userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Profile has been updated.");
    });
  });
};
