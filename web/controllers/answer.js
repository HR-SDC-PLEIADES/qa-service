const { answer } = require('../models/');

module.exports = {
  getAnswers: (req, res) => {
    const { questionId } = req.params;
    const { page, count } = req.query;
    answer
      .getAnswersByQuestionId(questionId, page, count)
      .then((answers) => {
        res.status(200).send(answers);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  postAnswer: (req, res) => {
    const { questionId } = req.params;
    answer
      .createAnswer(questionId, req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  putHelpful: (req, res) => {
    const { answerId } = req.params;
    answer
      .updateAnswerHelpful(answerId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  putReport: (req, res) => {
    const { answerId } = req.params;
    answer
      .updateAnswerReport(answerId)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
