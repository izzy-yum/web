-- Auth v2 migration 2/3: add display_name and reserved handle columns to users.
-- See infrastructure/ACCOUNT_AND_PAIRING.md §2.2, §2.4, §6.3.
-- Issue: izzy-yum/web#37.

-- DEFAULT exists only to backfill rows created before Auth v2 signup collected
-- the field; the default is then dropped so new rows must supply display_name.
ALTER TABLE users
  ADD COLUMN display_name TEXT NOT NULL DEFAULT 'Hungry Cook';
ALTER TABLE users ALTER COLUMN display_name DROP DEFAULT;

-- Reserved for future social features (see §2.4). Nullable + UNIQUE so that
-- multiple NULLs coexist in Postgres while any populated handle stays unique.
ALTER TABLE users ADD COLUMN handle TEXT UNIQUE;
