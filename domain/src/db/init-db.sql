-- TODO: Move password till env file
-- CREATE USER ccpilot_app WITH PASSWORD 'app_pass';
--
-- GRANT ALL ON SCHEMA public TO ccpilot_app;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public to ccpilot_app;
-- ALTER SCHEMA public OWNER TO ccpilot_app;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES to ccpilot_app;

DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'ccpilot_app') THEN
        CREATE ROLE ccpilot_app WITH LOGIN PASSWORD 'app_pass';
    END IF;
END
$$;

\c ccpilot_db

ALTER SCHEMA public OWNER TO ccpilot_app;

GRANT CONNECT ON DATABASE ccpilot_db TO ccpilot_app;
GRANT USAGE, CREATE ON SCHEMA public TO ccpilot_app;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ccpilot_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ccpilot_app;
