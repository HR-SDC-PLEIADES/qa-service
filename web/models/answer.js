const pool = require('../db');

module.exports = {
  getAnswersByQuestionId: (questionId, page = 1, count = 5) => {
    return pool
      .connect()
      .then((client) => {
        const query = `SELECT $1 as question, $2 as page, $3 as count, json_agg(results)
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
            ORDER BY a.answer_id ASC
            OFFSET $2
            LIMIT $3
        ) results`;
        return client
          .query(query, [questionId, page * count - count, count])
          .then((res) => {
            client.release();
            return res.rows[0];
          })
          .catch((e) => {
            client.release();
            console.log(e.stack);
          });
      })
      .catch((e) => console.log(e.stack));
  },

  createAnswer: (questionId, { body, name, email, photos }) => {
    const query = `INSERT INTO public.answer (question_id,body,"date",answer_name,email) VALUES ($1,$2,$3,$4,$5)`;
    return pool
      .connect()
      .then((client) => {
        return client
          .query(query, [questionId, body, new Date(), name, email, photos])
          .then((res) => {
            client.release();
            return res;
          })
          .catch((e) => {
            client.release();
            console.log(e.stack);
          });
      })
      .catch((e) => console.log(e.stack));
  },

  updateAnswerHelpful: (answerId) => {
    const query = `UPDATE public.answer SET helpfulness = helpfulness + 1
    WHERE answer_id = $1;`;
    return pool
      .connect()
      .then((client) => {
        return client
          .query(query, [answerId])
          .then((res) => {
            client.release();
            return res;
          })
          .catch((e) => {
            client.release();
            console.log(e.stack);
          });
      })
      .catch((e) => console.log(e.stack));
  },

  updateAnswerReport: (answerId) => {
    const query = `UPDATE public.answer SET reported = reported + 1
    WHERE answer_id = $1;`;
    return pool
      .connect()
      .then((client) => {
        return client
          .query(query, [answerId])
          .then((res) => {
            client.release();
            return res;
          })
          .catch((e) => {
            client.release();
            console.log(e.stack);
          });
      })
      .catch((e) => console.log(e.stack));
  },
};
