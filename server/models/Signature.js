const { Schema, model } = require("mongoose");

const SignatureSchema = new Schema(
   {
      user: { type: Schema.Types.ObjectId, ref: "users", required: true },
      disabled: { type: Boolean, required: true, default: false },
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
                  content: {
                     type: String,
                     required: true,
                     id: { type: Schema.Types.ObjectId, auto: true },
                  },
               },
            ],
         },
      ],
   },
   { timestamps: true }
);

SignatureSchema.index(
   { user: 1, name: 1 },
   {
      unique: true,
      partialFilterExpression: { disabled: { $eq: false } },
   }
);

SignatureSchema.method("toJSON", function () {
   const { __v, _id, password, ...object } = this.toObject();

   object.id = _id;

   return object;
});

SignatureSchema.methods.addPage = function (pageContent) {
   this.pages.push({ content: pageContent });
   return this.save();
};

SignatureSchema.methods.editPage = function (pageIndex, updatedContent) {
   if (pageIndex >= 0 && pageIndex < this.pages.length) {
      this.pages[pageIndex].content = updatedContent;
      return this.save();
   } else {
      return Promise.reject(new Error("Invalid page index"));
   }
};

SignatureSchema.methods.deletePage = function (pageIndex) {
   if (pageIndex >= 0 && pageIndex < this.pages.length) {
      this.pages.splice(pageIndex, 1);
      return this.save();
   } else {
      return Promise.reject(new Error("Invalid page index"));
   }
};

SignatureSchema.methods.getPage = function (pageIndex) {
   if (pageIndex >= 0 && pageIndex < this.pages.length) {
      return this.pages[pageIndex];
   } else {
      return Promise.reject(new Error("Invalid page index"));
   }
};

module.exports = model("signatures", SignatureSchema);
