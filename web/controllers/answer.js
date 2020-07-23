const { answer } = require('../models/');

module.exports = {
  getAnswers: (req, res) => {
    { questionId } = req.params;
    answer
      .getAnswersByQuestionId(questionId)
      .then((answers) => {
        res.status(200).send(answers);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  postAnswer: (req, res) => {
    { questionId } = req.params;
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
    { answerId } = req.params;
    answer
      .updateAnswerHelpful(answerId, req.body)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  putReport: (req, res) => {
    { answerId } = req.params;
    answer
      .updateAnswerReport(answerId, req.body)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
