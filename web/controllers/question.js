const { question } = require('../models/');

module.exports = {
  getQuestions: (req, res) => {
    const { productId } = req.params;
    const { page, count } = req.query;
    question
      .getQuestionsByProductId(productId, page, count)
      .then((questions) => {
        res.status(200).send(questions);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  postQuestion: (req, res) => {
    const { productId } = req.params;
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
    const { questionId } = req.params;
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
    const { questionId } = req.params;
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
