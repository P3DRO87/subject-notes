const { response } = require("express");
const Signature = require("../models/Signature");

const getSignaturePage = async (req, res = response) => {
   const { id } = req.params;

   const { index } = req.body;

   try {
      const signatureDB = await Signature.findById(id);

      if (!signatureDB) return res.status(400).json({ msg: "Invalid signature" });

      const signaturePage = await Signature.getPage(index);

      res.json({ signaturePage });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const getAllSignaturesPages = async (req, res = response) => {
   const { id } = req.params;

   const { offset = 0, limit = 5 } = req.query;

   try {
      const signaturePagesDB = await Signature.findById(id)
         .select("pages")
         .skip(+offset)
         .limit(+limit)
         .lean();

      if (!signaturePagesDB) return res.status(400).json({ msg: "Invalid signature" });

      res.json({ signaturePages: signaturePagesDB });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

const addNewSignaturePage = async (req, res = response) => {
   const { id } = req.params;
   try {
      const signatureDB = await Signature.findById(id);

      if (!signatureDB) return res.status(400).json({ msg: "Invalid signature" });

      const updatedSignature = await signatureDB.addPage();

      res.json({ updatedSignature });
   } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
   }
};

module.exports = { getSignaturePage, getAllSignaturesPages, addNewSignaturePage };
