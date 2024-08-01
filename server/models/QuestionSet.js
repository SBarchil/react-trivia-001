const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSetSchema = new Schema({
  questionSetID: String,
  userID: String,
  isPublic: Boolean,
  dateCreation: Date,
  question: String,
  answer_1: String,
  answer_2: String,
  answer_3: String,
  answer_4: String,
  correctAnswer: Number,
});

mongoose.model("questionSets", questionSetSchema);
