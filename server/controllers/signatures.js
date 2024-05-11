const { response } = require("express");
const Signature = require("../models/Signature");

const getSignature = async (req, res = response) => {
   const { id } = req.params;

   try {
      const signatureDB = await Signature.findById(id).select("name _id").lean();

      if (!signatureDB) {
         return res.status(400).json({ msg: "This signature doesn't exist" });
      }

      res.json({ signature: signatureDB });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const getAllSignatures = async (req, res = response) => {
   try {
      const DEFAULT_SIGNATURES_LIMIT = 10;

      const { limit = DEFAULT_SIGNATURES_LIMIT, offset = 0 } = req.query;

      const userSignatures = await Signature.find({ user: req._id, disabled: false })
         .skip(+offset)
         .limit(+limit)
         .select("name _id")
         .lean();

      res.json({
         signatures: userSignatures.map((signature) => ({
            name: signature.name,
            id: signature._id,
         })),
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const createNewSingnature = async (req, res = response) => {
   const { name = "" } = req.body;

   try {
      const signatureDB = await Signature.findOne({
         user: req._id,
         name,
         disabled: false,
      });

      if (signatureDB) {
         return res.status(400).json({ msg: "This signature already exist" });
      }

      const newSignature = new Signature({ name, user: req._id });

      await newSignature.save();

      res.status(201).json({ newSignature, id: newSignature._id });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const updateSignatureName = async (req, res = response) => {
   const { id } = req.params;

   const { name = "" } = req.body;

   try {
      const signatureDB = await Signature.findById(id);

      if (!signatureDB) {
         return res.status(400).json({ msg: "This signature doesn't exist" });
      }

      const updatedSignature = await Signature.findByIdAndUpdate(
         id,
         { name },
         { new: true }
      );

      res.status(201).json({ updatedSignature });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const deleteSignature = async (req, res = response) => {
   const { id } = req.params;

   try {
      const signatureDB = await Signature.findById(id);

      if (!signatureDB) {
         return res.status(400).json({ msg: "This signature doesn't exist" });
      }

      const deletedSignature = await Signature.findByIdAndUpdate(
         id,
         { disabled: true },
         { new: true }
      );

      res.status(201).json({ deletedSignature });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

module.exports = {
   getSignature,
   getAllSignatures,
   createNewSingnature,
   updateSignatureName,
   deleteSignature,
};
