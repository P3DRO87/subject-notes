const { Schema, model } = require("mongoose");

const QuickNoteSchema = new Schema(
   {
      user: { type: Schema.Types.ObjectId, ref: "users", required: true },
      title: { type: String, required: true },
      description: { type: String },
      content: { type: String, required: true },
   },
   { timestamps: true }
);

QuickNoteSchema.method("toJSON", function () {
   const { __v, _id, password, ...object } = this.toObject();

   object.id = _id;

   return object;
});

module.exports = model("QuickNote", QuickNoteSchema);
