CREATE TABLE question (
  question_id bigserial NOT NULL,
  product_id bigint,
  question_body TEXT,
  question_date timestamp,
  asker_name TEXT,
  email TEXT,
  question_helpfulness integer NOT NULL DEFAULT 0,
  reported smallint NOT NULL DEFAULT 0,
  PRIMARY KEY (question_id)
);

CREATE TABLE answer (
  answer_id bigserial NOT NULL,
  question_id bigint,
  body TEXT,
  date timestamp,
  answer_name TEXT,
  email TEXT,
  helpfullness integer NOT NULL DEFAULT 0,
  reported smallint NOT NULL DEFAULT 0,
  PRIMARY KEY (answer_id),
  FOREIGN KEY (question_id)
      REFERENCES question (question_id) MATCH SIMPLE
      ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE answer_photos (
  id bigserial CONSTRAINT no_null NOT NULL,
  url TEXT,
  answer_id bigint,
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id)
      REFERENCES answer (answer_id) MATCH SIMPLE
      ON DELETE CASCADE ON UPDATE NO ACTION
);


SELECT json_agg(results)
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