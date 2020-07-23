const pool = require('../db');

module.exports = {
  getQuestionsByProductId: (productId, page, count) => {
    return pool.connect().then((client) => {
      const query = `SELECT json_agg(results)
      FROM (
          SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness, q.reported,
          (
          SELECT coalesce(json_object_agg(answer_id, answer), '{}'::JSON)
          FROM (
              SELECT a.answer_id, a.body, a.date, a.answer_name, a.helpfullness,
                (
                  SELECT array_to_json(coalesce(array_agg(photo), ARRAY[]::record[]))
                  FROM (
                    SELECT pap.id, pap.url
                    FROM public.answer pa
                    INNER JOIN public.answer_photos pap
                    ON pa.answer_id = pap.answer_id
                    WHERE pap.answer_id = a.answer_id
                  ) photo
                ) as photos
              FROM public.answer a
              INNER JOIN public.question pq
              ON pq.question_id = a.question_id
              WHERE a.question_id = q.question_id
            ) answer
          ) answers
          FROM public.question q
          WHERE q.product_id = $1
      ) results
      ORDER BY q.question_id ASC
      OFFSET $2
      LIMIT $3`;
      const result = client.query(query, [
        questionId,
        page * count - count,
        count,
      ]);
      client.release();
      return result.rows;
    });
  },

  createQuestion: (productId, { body, name, email }) => {
    const query = `INSERT INTO public.question (product_id,body,name,email,date) VALUES ($1,$2,$3)`;
    return pool.connect().then((client) => {
      const result = client.query(query, [
        productId,
        body,
        name,
        email,
        new Date(),
      ]);
      client.release();
      return result.rows;
    });
  },

  updateQuestionHelpful: (questionId) => {
    const query = `UPDATE public.question SET helpfulness = helpfulness + 1
    WHERE question_id = $1;`;
    return pool.connect().then((client) => {
      const result = client.query(query, [questionId]);
      client.release();
      return result.rows;
    });
  },

  updateQuestionReport: (questionId) => {
    const query = `UPDATE public.question SET reported = reported + 1
    WHERE question_id = $1;`;
    return pool.connect().then((client) => {
      const result = client.query(query, [questionId]);
      client.release();
      return result.rows;
    });
  },
};
