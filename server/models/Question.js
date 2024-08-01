const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  userID: String,
  questionSet: String,
  question: String,
  answer_1: String,
  answer_2: String,
  answer_3: String,
  answer_4: String,
  correctAnswer: Number,
});

mongoose.model("questions", questionSchema);
