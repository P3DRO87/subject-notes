const { response, request } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/jwt");
const axios = require("axios");
const QuickNote = require("../models/QuickNote");

const { GOOGLE_DECODE_URL } = process.env;

const initialNote = {
   title: "Mi primera Nota",
   description: "Este es un ejemplo. Puedes editar una nota haciendo click sobre ella",
   content:
      "Contenido de ejemplo: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam iure cumque quisquam adipisci, et alias dolorum eveniet laboriosam facilis consequatur, recusandae aspernatur neque repudiandae, praesentium ea impedit? Animi, fugit placeat?",
};

const updateUser = async (req, res = response) => {
   try {
      const { id, role } = req.body;

      if (!role) return res.status(400).json({ msg: "Invalid role" });

      const adminUser = await User.findById(req._id);

      if (adminUser.role !== "admin") {
         return res.status(401).json({ msg: "Unauthorized" });
      }

      const userToUpdate = await User.findById(id);

      if (!userToUpdate) return res.status(400).json({ msg: "Invalid user" });

      const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });

      res.json({ updatedUser });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const loginUser = async (req, res = response) => {
   const { email = "", password = "" } = req.body;

   try {
      const user = await User.findOne({ email });

      const { role, name, _id, google } = user || {};

      if (!user || google) return res.status(400).json({ msg: "Invalid user" });

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) return res.status(400).json({ msg: "Invalid Password" });

      const token = await generateJWT({ name, _id });

      res.json({ token, user: { email, role, name, id: _id } });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         msg: error?.response?.statusText || "Internal server error",
      });
   }
};

const googleLogin = async (req = request, res = response) => {
   const googleToken = req?.header("x-token") || "";

   try {
      const { data: googleUser } = await axios.get(GOOGLE_DECODE_URL, {
         headers: {
            Authorization: `Bearer ${googleToken}`,
         },
      });

      const user = await User.findOne({ email: googleUser.email });

      if (user) {
         const { name, _id, role, email, picture } = user;

         const token = await generateJWT({ name, _id: user._id });

         return res.json({ token, user: { name, id: _id, role, email, picture } });
      }

      const newUser = new User(googleUser);

      newUser.password = "Silence is gold";

      newUser.role = "student";

      await newUser.save();

      const sampleQuickNote = QuickNote({ ...initialNote, user: newUser.id });
      await sampleQuickNote.save();

      const { name, id, role, email, picture } = newUser;

      const token = await generateJWT({ name, _id: id });

      res.json({ token, user: { id, role, email, picture, name } });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const registerUser = async (req, res = response) => {
   const { email = "", password = "", name } = req.body;

   try {
      let user = await User.findOne({ email });

      if (user) return res.status(400).json({ msg: "The user already exist" });

      user = new User(req.body);

      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password, salt);

      user.role = "student";

      await user.save();

      const token = await generateJWT({ name, _id: user._id });

      const { _id, role, email: userEmail } = user;

      res.json({ token, user: { name, id: _id, role, email: userEmail } });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const validateToken = async (req, res = response) => {
   try {
      const { _id, name } = req;

      const userDB = await User.findById(_id);

      if (!userDB) return res.status(400).json({ msg: "Invalid user" });

      const { role, picture, email } = userDB;

      const newToken = await generateJWT({ name, _id });

      res.json({ token: newToken, user: { id: _id, role, name, email, picture } });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Internal server error" });
   }
};

module.exports = {
   updateUser,
   loginUser,
   googleLogin,
   registerUser,
   validateToken,
};
