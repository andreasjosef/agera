-- TODO: Move password till env file
CREATE USER ccpilot_app WITH PASSWORD 'app_pass';

GRANT USAGE ON SCHEMA public TO ccpilot_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public to ccpilot_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES to ccpilot_app;


