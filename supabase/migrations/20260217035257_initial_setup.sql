-- Initial setup migration
-- This migration file is a placeholder for the initial database setup
-- Actual schema will be created in subsequent migrations

-- Enable UUID extension (required for primary keys)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- This migration creates the foundation for the Izzy Yum database
-- Subsequent migrations will add tables, indexes, and row-level security
