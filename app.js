// Importing necessary modules
const fs = require("fs");

// Define a class for Question
class Question {
  constructor(question, subject, topic, difficulty, marks) {
    this.question = question;
    this.subject = subject;
    this.topic = topic;
    this.difficulty = difficulty;
    this.marks = marks;
  }
}

// Define a class for QuestionStore
class QuestionStore {
  constructor() {
    this.questions = [];
  }

  // Add a new question to the store
  addQuestion(question) {
    this.questions.push(question);
  }

  // Retrieve questions based on difficulty
  getQuestionsByDifficulty(difficulty) {
    return this.questions.filter((q) => q.difficulty === difficulty);
  }
}

// Define a class for QuestionPaperGenerator
class QuestionPaperGenerator {
  constructor(questionStore) {
    this.questionStore = questionStore;
  }

  // Generate a question paper based on total marks and difficulty distribution
  generateQuestionPaper(totalMarks, difficultyDistribution) {
    const questionPaper = [];
    const difficultyLevels = Object.keys(difficultyDistribution);

    difficultyLevels.forEach((difficulty) => {
      const questions = this.questionStore.getQuestionsByDifficulty(difficulty);
      const numberOfQuestions = Math.floor(
        (difficultyDistribution[difficulty] / 100) * totalMarks
      );

      // Shuffle questions to randomize selection
      questions.sort(() => Math.random() - 0.5);

      // Add selected questions to the question paper
      questionPaper.push(...questions.slice(0, numberOfQuestions));
    });

    return questionPaper;
  }
}

// Read sample inputs from the JSON file
const rawdata = fs.readFileSync("inputs.json");
const sampleInputs = JSON.parse(rawdata);

// Create a QuestionStore instance and populate it with sample questions
const questionStore = new QuestionStore();
sampleInputs.questions.forEach((q) =>
  questionStore.addQuestion(
    new Question(q.question, q.subject, q.topic, q.difficulty, q.marks)
  )
);

// Create a QuestionPaperGenerator instance
const questionPaperGenerator = new QuestionPaperGenerator(questionStore);

// Define difficulty distribution for the example
const difficultyDistribution = {
  Easy: 20,
  Medium: 50,
  Hard: 30,
};

// Generate a question paper with a total of 100 marks
const generatedQuestionPaper = questionPaperGenerator.generateQuestionPaper(
  100,
  difficultyDistribution
);

// Display the generated question paper
console.log("Generated Question Paper:");
console.log(generatedQuestionPaper);
