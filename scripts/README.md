# Database Management Scripts

Utility scripts for managing the Izzy Yum Supabase database.

---

## delete-user.sh

Interactive script to delete users from the database.

### Usage

**For Cloud Database (Production):**

```bash
# Set your Supabase connection string
export SUPABASE_DB_URL='postgresql://postgres.oogpnrrsmpklafdrvvkg:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres'

# Run the script
./scripts/delete-user.sh
```

**For Local Database:**

```bash
# Just run the script (will auto-detect local)
./scripts/delete-user.sh

# Or press Enter when prompted for connection string
```

### Get Your Cloud Database Connection String

1. Go to https://supabase.com/dashboard/project/oogpnrrsmpklafdrvvkg/settings/database
2. Under **Connection string**, select **"Session mode"** (for psql)
3. Copy the connection string
4. Replace `[YOUR-PASSWORD]` with your actual database password

Example:
```
postgresql://postgres.oogpnrrsmpklafdrvvkg:your_password@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

### What It Does

1. Queries `auth.users` table
2. Displays table of all users with:
   - User ID (truncated for display)
   - Email address
   - Phone number
   - Email verified status
   - Phone verified status
   - Created date
3. Prompts you to select a user by number
4. Asks for confirmation (must type "DELETE")
5. Deletes the user and all associated data:
   - User account from `auth.users`
   - Shopping lists (if any)
   - Shopping list items (if any)
   - User metadata

### Example Output

```
╔════════════════════════════════════════════╗
║   Izzy Yum - User Management Script       ║
╔════════════════════════════════════════════╗

Using local database

Fetching users from database...

Users in database:

┌────┬──────────────────────────────────────┬─────────────────────────┬──────────────┬────────┬───────┬──────────────────┐
│ #  │ User ID                              │ Email                   │ Phone        │ Email✓ │ Phone✓│ Created          │
├────┼──────────────────────────────────────┼─────────────────────────┼──────────────┼────────┼───────┼──────────────────┤
│ 1  │ 550e8400...440000                    │ test@example.com        │ +14155551234 │ Yes    │ Yes   │ 2026-02-27 10:00 │
│ 2  │ 660e9511...551111                    │ user2@example.com       │ No phone     │ Yes    │ No    │ 2026-02-26 15:30 │
└────┴──────────────────────────────────────┴─────────────────────────┴──────────────┴────────┴───────┴──────────────────┘

Enter the number of the user to delete (or 'q' to quit):
> 1

⚠️  WARNING: You are about to delete:
   Email: test@example.com
   ID: 550e8400-e29b-41d4-a716-446655440000

This will delete:
   - User account
   - All shopping lists created by this user
   - All shopping list items
   - All user metadata

This action CANNOT be undone!

Type 'DELETE' in all caps to confirm: DELETE

Deleting user...
✓ User deleted successfully

Deleted:
  - User: test@example.com
  - ID: 550e8400-e29b-41d4-a716-446655440000
  - All associated data (shopping lists, etc.)

Done!
```

### Safety Features

- ✅ Requires explicit confirmation ("DELETE" in all caps)
- ✅ Shows preview of what will be deleted
- ✅ Can cancel at any time (press 'q' or incorrect confirmation)
- ✅ Shows detailed success/error messages
- ✅ Color-coded output for clarity

### Notes

- Deleting from `auth.users` automatically cascades to related tables
- Supabase handles foreign key constraints and cascading deletes
- Local database: No password needed (postgres:postgres)
- Cloud database: Requires full connection string with password

---

## Quick Commands

### List All Users (Without Deleting)

```bash
# Local database
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres -c "
SELECT email, created_at FROM auth.users ORDER BY created_at DESC;
"

# Cloud database
psql "$SUPABASE_DB_URL" -c "
SELECT email, created_at FROM auth.users ORDER BY created_at DESC;
"
```

### Delete Specific User by Email

```bash
# Local database
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres -c "
DELETE FROM auth.users WHERE email = 'test@example.com';
"

# Cloud database
psql "$SUPABASE_DB_URL" -c "
DELETE FROM auth.users WHERE email = 'test@example.com';
"
```

### Delete All Test Users

```bash
# Be VERY careful with this!
psql "$SUPABASE_DB_URL" -c "
DELETE FROM auth.users WHERE email LIKE '%test%' OR email LIKE '%example%';
"
```

---

## Troubleshooting

### "psql: command not found"

Install PostgreSQL client:
```bash
brew install postgresql
```

### "Connection refused"

**For local database:**
- Check Supabase is running: `supabase status`
- Start if needed: `supabase start`

**For cloud database:**
- Verify connection string is correct
- Check password is correct
- Ensure you're using "Session mode" connection string

### "Permission denied"

**For local database:**
- Should work by default (no password needed)

**For cloud database:**
- Verify you're the project owner
- Check password is correct
- Try resetting database password in Supabase dashboard

---

## Warning

**⚠️ USE WITH CAUTION**

- Deleting users is permanent
- All user data is lost
- Cannot be undone
- Use only for testing/development cleanup
- In production, consider soft deletes (marking users as deleted)

---

*For more database management tasks, check Supabase Dashboard → Database → Table Editor*
