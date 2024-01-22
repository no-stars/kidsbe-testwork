CREATE DATABASE kidsbe_users;
CREATE DATABASE kidsbe_admins;
CREATE DATABASE kidsbe_articles;

CREATE USER users_service_user WITH PASSWORD 'root1';
CREATE USER admins_service_user WITH PASSWORD 'root2';
CREATE USER articles_service_user WITH PASSWORD 'root3';

GRANT ALL PRIVILEGES ON DATABASE kidsbe_users to users_service_user;
GRANT ALL PRIVILEGES ON DATABASE kidsbe_admins to admins_service_user;
GRANT ALL PRIVILEGES ON DATABASE kidsbe_articles to articles_service_user;

\c kidsbe_users;

CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY,
  login TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

GRANT ALL ON TABLE users TO users_service_user;

INSERT INTO users (user_id, login, password, created_at, updated_at)
VALUES (
  '134f99e4-0ce0-42b8-9ede-db5dff8b478d',
  'Frey_Briett',
  '$2b$10$rqhnqJqlH7FA0V23xTMw6.wjsY.9J3LTdR1E9DHh4w7aw6ndLq0py',
  '2022-12-03 16:00:30',
  NULL
), (
  '6df38098-7cce-4e96-8141-9b95b4bad207',
  'rinave123',
  '$2b$10$rqhnqJqlH7FA0V23xTMw6.wjsY.9J3LTdR1E9DHh4w7aw6ndLq0py',
  '2023-01-11 06:14:12',
  NULL
), (
  '57711c99-a23a-4724-bf3c-5f424de63bb3',
  'lioramal',
  '$2b$10$rqhnqJqlH7FA0V23xTMw6.wjsY.9J3LTdR1E9DHh4w7aw6ndLq0py',
  '2024-01-01 08:22:37',
  NULL
);

\c kidsbe_admins;

CREATE TABLE IF NOT EXISTS admins (
  admin_id UUID PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

GRANT ALL ON TABLE admins TO admins_service_user;

INSERT INTO admins (admin_id, user_id, created_at, updated_at)
VALUES (
  'bfba6a3c-5c90-4db0-a191-b7b1de84bc41',
  '134f99e4-0ce0-42b8-9ede-db5dff8b478d',
  '2022-12-05 12:10:01',
  NULL
);

\c kidsbe_articles;

CREATE TABLE IF NOT EXISTS articles (
  article_id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID NOT NULL,
  modified_by UUID,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

GRANT ALL ON TABLE articles TO articles_service_user;

INSERT INTO articles (article_id, title, content, author_id, modified_by, created_at, updated_at)
VALUES (
  'aed3a8d5-701d-4592-982e-39ea11bb9fb5',
  'Новые фильмы 2023, которые уже вышли в хорошем качестве',
  'Практически все фильмы последних лет невозможно смотреть без слёз. Пора начинать делать подборки на фильмы 90-х и 00-х.',
  '6df38098-7cce-4e96-8141-9b95b4bad207',
  NULL,
  '2024-03-03 23:15:59',
  NULL
);
