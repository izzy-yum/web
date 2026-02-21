#!/bin/bash

# Script to wipe all user registrations from local Supabase database

echo "🗑️  Wiping all user registrations..."

psql postgresql://postgres:postgres@127.0.0.1:54322/postgres << 'EOF'

-- Delete all users from Supabase Auth
DELETE FROM auth.users;

-- Delete all related auth data
DELETE FROM auth.sessions;
DELETE FROM auth.refresh_tokens;
DELETE FROM auth.identities;

-- Delete from public users table (if any exist)
DELETE FROM public.users;

-- Show results
SELECT 'Users cleared!' as status;
SELECT COUNT(*) as remaining_users FROM auth.users;

EOF

echo "✅ All user registrations have been wiped!"
