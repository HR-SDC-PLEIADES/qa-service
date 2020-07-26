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

CREATE INDEX answer_question_id_idx ON answer (question_id);

CREATE INDEX answer_photos_answer_id_idx ON answer_photos (answer_id);