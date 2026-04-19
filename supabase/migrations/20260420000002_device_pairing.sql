-- Auth v2 migration 3/3: device pairing + device tables.
-- See infrastructure/ACCOUNT_AND_PAIRING.md §6.3 and §6.4.
-- Issue: izzy-yum/web#37.

-- user_devices is created before device_pairing_codes because
-- device_pairing_codes.consumed_by_device_id has a FK into user_devices(id).
-- The design doc lists them in the opposite order; that would fail to apply.
CREATE TABLE user_devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
    device_name TEXT,
    push_token TEXT,
    first_paired_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ
);
CREATE INDEX idx_user_devices_user
    ON user_devices (user_id)
    WHERE revoked_at IS NULL;
CREATE INDEX idx_user_devices_push_token
    ON user_devices (push_token)
    WHERE revoked_at IS NULL AND push_token IS NOT NULL;

CREATE TABLE device_pairing_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    opaque_token TEXT NOT NULL UNIQUE,
    display_code TEXT NOT NULL,
    display_code_attempts INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    consumed_at TIMESTAMPTZ,
    consumed_by_device_id UUID REFERENCES user_devices(id)
);
CREATE INDEX idx_pairing_active
    ON device_pairing_codes (user_id)
    WHERE consumed_at IS NULL;
CREATE INDEX idx_pairing_token ON device_pairing_codes (opaque_token);

-- RLS: user_devices is client-visible for SELECT + UPDATE (revoke) scoped to self.
ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users see their own devices"
    ON user_devices FOR SELECT
    USING (user_id = auth.uid());
CREATE POLICY "users revoke their own devices"
    ON user_devices FOR UPDATE
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- RLS: device_pairing_codes has no direct client access; pairing is mediated by
-- edge functions (web#45) using the service role, which bypasses RLS.
ALTER TABLE device_pairing_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "no direct client access"
    ON device_pairing_codes FOR ALL
    USING (false);
