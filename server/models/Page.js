const { Schema, model } = require("mongoose");

const PageSchema = new Schema(
   {
      user: { type: Schema.Types.ObjectId, ref: "users", required: true },
      name: { type: String, required: true },
      pages: [{ type: Schema.Types.ObjectId, ref: "pages", required: true }],
   },
   { timestamps: true }
);

module.exports = model("pages", PageSchema);
