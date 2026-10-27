-- ============================================================================
-- Briticana PostgreSQL Least-Privilege Application User Setup
-- Run as a database administrator before deploying the Django application.
-- DO NOT hardcode or commit real passwords in this file.
-- Replace <STRONG_RANDOM_DB_PASSWORD> at execution time via environment/vault.
-- ============================================================================

-- 1. Create dedicated non-superuser role
-- Production: NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS
CREATE ROLE briticana_app WITH
    LOGIN
    PASSWORD '<STRONG_RANDOM_DB_PASSWORD>'
    NOSUPERUSER
    NOCREATEDB
    NOCREATEROLE
    NOREPLICATION
    NOBYPASSRLS
    CONNECTION LIMIT 50;

-- 2. Revoke public schema creation from PUBLIC role (PostgreSQL 15+ default, enforced explicitly)
REVOKE ALL ON DATABASE briticana_db FROM PUBLIC;
REVOKE CREATE ON SCHEMA public FROM PUBLIC;

-- 3. Grant strictly required database and schema privileges to briticana_app
GRANT CONNECT, TEMPORARY ON DATABASE briticana_db TO briticana_app;

-- Connect to briticana_db before running the schema-level grants below:
-- \c briticana_db

GRANT USAGE, CREATE ON SCHEMA public TO briticana_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO briticana_app;
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO briticana_app;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO briticana_app;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO briticana_app;

-- Security timeouts to prevent long-running query DoS
ALTER ROLE briticana_app SET statement_timeout = '15s';
ALTER ROLE briticana_app SET idle_in_transaction_session_timeout = '30s';
ALTER ROLE briticana_app SET lock_timeout = '5s';
