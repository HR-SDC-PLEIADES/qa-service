const pool = require('../db');

module.exports = {
  getAnswersByQuestionId: (questionId, page, count) => {
    return pool
      .connect()
      .then((client) => {
        const query = `SELECT json_agg(results)
        FROM (
            SELECT a.answer_id, a.body, a.date, a.answer_name, a.helpfullness,
              (
                SELECT array_to_json(coalesce(array_agg(photo), ARRAY[]::record[]))
                FROM (
                  SELECT public.answer_photos.id, public.answer_photos.url
                  FROM public.answer
                  INNER JOIN public.answer_photos
                  ON public.answer.answer_id = public.answer_photos.answer_id
                  WHERE public.answer_photos.answer_id = a.answer_id
                ) photo
              ) as photos
            FROM public.answer a
            WHERE a.question_id = $1
        ) results
        ORDER BY q.question_id ASC
        OFFSET $2
        LIMIT $3`;
        const result = client.query(query, [questionId]);
        client.release();
        return result.rows;
      })
      .then((results) => ({
        question: questionId,
        page: page,
        count: count,
        results: results,
      }));
  },

  createAnswer: (questionId, { questionId, body, name, email, photos }) => {
    const query = `INSERT INTO public.answer (question_id,body,"date",answer_name,email) VALUES ($1,$2,$3,$4,$5)`;
    return pool.connect().then((client) => {
      const result = client.query(query, [
        questionId,
        body,
        new Date(),
        name,
        email,
        photos,
      ]);
      client.release();
      return result.rows;
    });
  },

  updateAnswerHelpful: (answerId) => {
    const query = `UPDATE public.answer SET helpfulness = helpfulness + 1
    WHERE answer_id = $1;`;
    return pool.connect().then((client) => {
      const result = client.query(query, [answerId]);
      client.release();
      return result.rows;
    });
  },

  updateAnswerReport: (answerId) => {
    const query = `UPDATE public.answer SET reported = reported + 1
    WHERE answer_id = $1;`;
    return pool.connect().then((client) => {
      const result = client.query(query, [answerId]);
      client.release();
      return result.rows;
    });
  },
};
