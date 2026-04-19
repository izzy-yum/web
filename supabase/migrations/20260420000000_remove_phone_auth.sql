-- Auth v2 migration 1/3: drop phone-based auth artifacts from users.
-- See infrastructure/ACCOUNT_AND_PAIRING.md §6.1 and §6.2.
-- Issue: izzy-yum/web#37.

-- phone_device_token is migrated into user_devices.push_token by migration 3's
-- §6.5 backfill (run separately if alpha data ever populated this column).
ALTER TABLE users DROP COLUMN IF EXISTS phone_device_token;

-- phone / phone_verified never existed in the current schema; IF EXISTS guards
-- the case where an older branch or cloud environment still has them.
ALTER TABLE users DROP COLUMN IF EXISTS phone;
ALTER TABLE users DROP COLUMN IF EXISTS phone_verified;

-- email is already UNIQUE NOT NULL in the core-tables migration; this is a
-- no-op locally but guarantees the invariant on any environment that drifted.
ALTER TABLE users ALTER COLUMN email SET NOT NULL;
