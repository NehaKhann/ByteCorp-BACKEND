const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  description: String,
  options: [
    {
      option: { type: String, required: true },
    },
  ],
});

const FormSchema = new mongoose.Schema({
  aboutForm: String,
  questions: [QuestionSchema],
});


module.exports = mongoose.model("Forms", FormSchema);
