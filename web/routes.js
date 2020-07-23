var { question, answer } = require('./controllers');
var router = require('express').Router();

router.get('/:productId', question.getQuestions);
router.post('/:productId', question.postQuestion);

router.put('/question/:questionId/helpful', question.putHelpful);
router.put('/question/:questionId/report', question.putReport);

router.get('/:questionId/answers', answer.getAnswers);
router.post('/:questionId/answers', answer.postAnswer);

router.put('/answer/:answerId/helpful', answer.putHelpful);
router.put('/answer/:answerId/report', answer.putReport);

module.exports = router;
