import User from "../models/UserModel.js";
import { mongoose } from "mongoose";
import cloudinary from "../utils/cloudinary.js";

const getUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ user });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "Email is already taken" });
  }
  try {
    const newUser = await User.create({ name, email, password });
    return res.status(200).json({ user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Incorrect Email" });
  }

  if (password != user.password) {
    return res.status(400).json({ error: "Incorrect Password" });
  }

  try {
    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.cloudinary) {
    await cloudinary.uploader.destroy(user.cloudinary);
  }

  try {
    const uploadResponse = await new Promise((resolve, reject) => {
      const bufferData = req.file.buffer;
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(bufferData);
    });

    await user.updateOne({
      image: uploadResponse.secure_url,
      cloudinary: uploadResponse.public_id,
    });

    return res.status(200).json({ success: "User updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser, updateUser, getUser };
