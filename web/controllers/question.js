const { question } = require('../models/');

module.exports = {
  getQuestions: (req, res) => {
    { productId } = req.params;
    question
      .getQuestionsByProductId(productId)
      .then((questions) => {
        res.status(200).send(questions);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  postQuestion: (req, res) => {
    { productId } = req.params;
    question
      .createQuestion(productId, req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  putHelpful: (req, res) => {
    { questionId } = req.params;
    question
      .updateQuestionHelpful(questionId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  putReport: (req, res) => {
    { questionId } = req.params;
    question
      .updateQuestionReport(questionId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
