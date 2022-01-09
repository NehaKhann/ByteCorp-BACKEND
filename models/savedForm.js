const mongoose = require("mongoose");

const SavedFormSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    form_id: {
      type: String,
      required: true,
    },
    response: [
      {
        questionid: { type: String, required: true },
        answerid: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedForm", SavedFormSchema);
