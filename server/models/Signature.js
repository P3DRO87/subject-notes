const { Schema, model } = require("mongoose");

const SignatureSchema = new Schema(
   {
      user: { type: Schema.Types.ObjectId, ref: "users", required: true },
      name: { type: String, required: true },
      pages: [
         {
            content: [
               {
                  type: {
                     type: String,
                     required: true,
                     enum: {
                        values: ["rich-text", "draw"],
                        message: "{VALUE} is not a valid type",
                     },
                  },
                  content: { type: String, required: true },
               },
            ],
         },
      ],
   },
   { timestamps: true }
);

module.exports = model("signatures", SignatureSchema);
