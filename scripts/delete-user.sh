#!/bin/bash

# Delete User Script for Izzy Yum
# Connects to Supabase database and allows interactive user deletion

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Izzy Yum - User Management Script       ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo ""

# Check if connection string is provided
if [ -z "$SUPABASE_DB_URL" ]; then
  echo -e "${YELLOW}Note: Set SUPABASE_DB_URL environment variable for cloud database${NC}"
  echo -e "${YELLOW}Example: export SUPABASE_DB_URL='postgresql://postgres.xxx:password@xxx.supabase.co:5432/postgres'${NC}"
  echo ""
  read -p "Enter Supabase database connection string (or press Enter for local): " DB_URL

  if [ -z "$DB_URL" ]; then
    # Default to local database
    DB_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
    echo -e "${GREEN}Using local database${NC}"
  else
    echo -e "${GREEN}Using provided database${NC}"
  fi
else
  DB_URL="$SUPABASE_DB_URL"
  echo -e "${GREEN}Using SUPABASE_DB_URL environment variable${NC}"
fi

echo ""
echo -e "${BLUE}Fetching users from database...${NC}"
echo ""

# Create temp file for user data
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT

# Query and save users to temp file
psql "$DB_URL" -t -c "
SELECT
  row_number() OVER (ORDER BY created_at DESC) as num,
  id,
  email,
  COALESCE(raw_user_meta_data->>'phone', 'No phone') as phone,
  CASE WHEN email_confirmed_at IS NOT NULL THEN 'Yes' ELSE 'No' END as email_verified,
  CASE WHEN phone_confirmed_at IS NOT NULL THEN 'Yes' ELSE 'No' END as phone_verified,
  to_char(created_at, 'YYYY-MM-DD HH24:MI') as created
FROM auth.users
ORDER BY created_at DESC;
" > "$TEMP_FILE" 2>&1

if [ $? -ne 0 ]; then
  echo -e "${RED}Error connecting to database:${NC}"
  cat "$TEMP_FILE"
  exit 1
fi

# Check if there are any users
if [ ! -s "$TEMP_FILE" ]; then
  echo -e "${YELLOW}No users found in database.${NC}"
  exit 0
fi

# Display users in a table format
echo -e "${GREEN}Users in database:${NC}"
echo ""
echo "┌────┬──────────────────────────────────────┬─────────────────────────┬──────────────┬────────┬───────┬──────────────────┐"
echo "│ #  │ User ID                              │ Email                   │ Phone        │ Email✓ │ Phone✓│ Created          │"
echo "├────┼──────────────────────────────────────┼─────────────────────────┼──────────────┼────────┼───────┼──────────────────┤"

cat "$TEMP_FILE" | while IFS='|' read -r num id email phone email_verified phone_verified created; do
  # Trim whitespace
  num=$(echo "$num" | xargs 2>/dev/null || echo "$num")
  id=$(echo "$id" | xargs 2>/dev/null || echo "$id")
  email=$(echo "$email" | xargs 2>/dev/null || echo "$email")
  phone=$(echo "$phone" | xargs 2>/dev/null || echo "$phone")
  email_verified=$(echo "$email_verified" | xargs 2>/dev/null || echo "$email_verified")
  phone_verified=$(echo "$phone_verified" | xargs 2>/dev/null || echo "$phone_verified")
  created=$(echo "$created" | xargs 2>/dev/null || echo "$created")

  # Skip empty lines
  [ -z "$num" ] && continue

  # Truncate email if too long
  if [ ${#email} -gt 23 ]; then
    email="${email:0:20}..."
  fi

  # Truncate ID for display
  short_id="${id:0:8}...${id: -4}"

  printf "│ %-2s │ %-36s │ %-23s │ %-12s │ %-6s │ %-5s │ %-16s │\n" \
    "$num" "$short_id" "$email" "$phone" "$email_verified" "$phone_verified" "$created"
done

echo "└────┴──────────────────────────────────────┴─────────────────────────┴──────────────┴────────┴───────┴──────────────────┘"
echo ""

# Prompt for selection
echo -e "${YELLOW}Enter the number of the user to delete (or 'q' to quit):${NC}"
read -p "> " selection

if [ "$selection" = "q" ] || [ "$selection" = "Q" ]; then
  echo "Cancelled."
  exit 0
fi

# Get the selected user's data
SELECTED_LINE=$(sed -n "${selection}p" "$TEMP_FILE")

if [ -z "$SELECTED_LINE" ]; then
  echo -e "${RED}Invalid selection.${NC}"
  exit 1
fi

# Parse the selected line
SELECTED_ID=$(echo "$SELECTED_LINE" | awk -F'|' '{print $2}' | xargs)
SELECTED_EMAIL=$(echo "$SELECTED_LINE" | awk -F'|' '{print $3}' | xargs)

if [ -z "$SELECTED_ID" ]; then
  echo -e "${RED}Could not parse user ID.${NC}"
  exit 1
fi

echo ""
echo -e "${RED}⚠️  WARNING: You are about to delete:${NC}"
echo -e "${YELLOW}   Email: $SELECTED_EMAIL${NC}"
echo -e "${YELLOW}   ID: $SELECTED_ID${NC}"
echo ""
echo -e "${RED}This will delete:${NC}"
echo "   - User account"
echo "   - All shopping lists created by this user"
echo "   - All shopping list items"
echo "   - All user metadata"
echo ""
echo -e "${YELLOW}This action CANNOT be undone!${NC}"
echo ""
read -p "Type 'DELETE' in all caps to confirm: " confirmation

if [ "$confirmation" != "DELETE" ]; then
  echo "Cancelled. User was not deleted."
  exit 0
fi

echo ""
echo -e "${BLUE}Deleting user...${NC}"

# Delete user from auth.users (cascades to related tables)
DELETE_RESULT=$(psql "$DB_URL" -c "DELETE FROM auth.users WHERE id = '$SELECTED_ID';" 2>&1)

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ User deleted successfully${NC}"
  echo ""
  echo "Deleted:"
  echo "  - User: $SELECTED_EMAIL"
  echo "  - ID: $SELECTED_ID"
  echo "  - All associated data (shopping lists, etc.)"
  echo ""
else
  echo -e "${RED}Error deleting user:${NC}"
  echo "$DELETE_RESULT"
  exit 1
fi

echo -e "${GREEN}Done!${NC}"
