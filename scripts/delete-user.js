#!/usr/bin/env node

/**
 * Delete User Script for Izzy Yum
 * Uses Supabase Admin API to delete users
 */

const { createClient } = require('@supabase/supabase-js')
const readline = require('readline')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve))
}

async function main() {
  console.log(`${colors.blue}╔════════════════════════════════════════════╗${colors.reset}`)
  console.log(`${colors.blue}║   Izzy Yum - User Management Script       ║${colors.reset}`)
  console.log(`${colors.blue}╔════════════════════════════════════════════╗${colors.reset}`)
  console.log('')

  // Check for environment variables or prompt
  let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  let supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Determine database type
  const isLocal = supabaseUrl && supabaseUrl.includes('127.0.0.1')
  const dbType = isLocal ? 'LOCAL DEVELOPMENT' : 'CLOUD PRODUCTION'
  const dbHost = supabaseUrl ? new URL(supabaseUrl).host : 'unknown'

  if (!supabaseUrl) {
    console.log(`${colors.yellow}No NEXT_PUBLIC_SUPABASE_URL found${colors.reset}`)
    supabaseUrl = await question('Enter Supabase project URL (or press Enter for local): ')

    if (!supabaseUrl) {
      supabaseUrl = 'http://127.0.0.1:54321'
      console.log(`${colors.green}Using local database${colors.reset}`)
    }
  }

  if (!supabaseServiceKey) {
    console.log(`${colors.yellow}SUPABASE_SERVICE_ROLE_KEY not found${colors.reset}`)
    console.log(`${colors.yellow}Get this from: Supabase Dashboard → Settings → API → service_role (secret)${colors.reset}`)
    console.log('')
    supabaseServiceKey = await question('Enter Supabase Service Role Key: ')

    if (!supabaseServiceKey) {
      console.log(`${colors.red}Error: Service role key is required to delete users${colors.reset}`)
      rl.close()
      process.exit(1)
    }
  }

  console.log('')
  console.log(`${colors.blue}═══════════════════════════════════════════${colors.reset}`)
  console.log(`${colors.green}Database: ${colors.reset}${colors.yellow}${dbType}${colors.reset}`)
  console.log(`${colors.green}Host:     ${colors.reset}${dbHost}`)
  console.log(`${colors.blue}═══════════════════════════════════════════${colors.reset}`)
  console.log('')

  // Create admin client with service role key
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  console.log(`${colors.blue}Fetching users from database...${colors.reset}`)
  console.log('')

  // Fetch all users using Admin API
  const { data: { users }, error } = await supabase.auth.admin.listUsers()

  if (error) {
    console.log(`${colors.red}Error fetching users: ${error.message}${colors.reset}`)
    rl.close()
    process.exit(1)
  }

  if (!users || users.length === 0) {
    console.log(`${colors.yellow}No users found in database.${colors.reset}`)
    rl.close()
    process.exit(0)
  }

  // Sort users by created_at (newest first)
  users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  // Display users in a table
  console.log(`${colors.green}Users in database:${colors.reset}`)
  console.log('')
  console.log('┌────┬──────────────────────────────────────┬─────────────────────────┬──────────────┬────────┬───────┬──────────────────┐')
  console.log('│ #  │ User ID                              │ Email                   │ Phone        │ Email✓ │ Phone✓│ Created          │')
  console.log('├────┼──────────────────────────────────────┼─────────────────────────┼──────────────┼────────┼───────┼──────────────────┤')

  users.forEach((user, index) => {
    const num = (index + 1).toString()
    const shortId = `${user.id.substring(0, 8)}...${user.id.substring(user.id.length - 4)}`
    const email = user.email || 'No email'
    const truncatedEmail = email.length > 23 ? `${email.substring(0, 20)}...` : email
    const phone = user.user_metadata?.phone || user.phone || 'No phone'
    const truncatedPhone = phone.length > 12 ? phone.substring(0, 12) : phone
    const emailVerified = user.email_confirmed_at ? 'Yes' : 'No'
    const phoneVerified = user.phone_confirmed_at ? 'Yes' : 'No'
    const created = new Date(user.created_at).toISOString().substring(0, 16).replace('T', ' ')

    console.log(
      `│ ${num.padEnd(2)} │ ${shortId.padEnd(36)} │ ${truncatedEmail.padEnd(23)} │ ${truncatedPhone.padEnd(12)} │ ${emailVerified.padEnd(6)} │ ${phoneVerified.padEnd(5)} │ ${created.padEnd(16)} │`
    )
  })

  console.log('└────┴──────────────────────────────────────┴─────────────────────────┴──────────────┴────────┴───────┴──────────────────┘')
  console.log('')

  // Prompt for selection
  const selection = await question(
    `${colors.yellow}Enter the number of the user to delete (or 'q' to quit):${colors.reset}\n> `
  )

  if (selection === 'q' || selection === 'Q') {
    console.log('Cancelled.')
    rl.close()
    process.exit(0)
  }

  const selectedIndex = parseInt(selection) - 1

  if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= users.length) {
    console.log(`${colors.red}Invalid selection.${colors.reset}`)
    rl.close()
    process.exit(1)
  }

  const selectedUser = users[selectedIndex]

  console.log('')
  console.log(`${colors.red}⚠️  WARNING: You are about to delete:${colors.reset}`)
  console.log(`${colors.yellow}   Email: ${selectedUser.email}${colors.reset}`)
  console.log(`${colors.yellow}   ID: ${selectedUser.id}${colors.reset}`)
  console.log('')
  console.log(`${colors.red}This will delete:${colors.reset}`)
  console.log('   - User account')
  console.log('   - All shopping lists created by this user')
  console.log('   - All shopping list items')
  console.log('   - All user sessions')
  console.log('   - All user metadata')
  console.log('')
  console.log(`${colors.yellow}This action CANNOT be undone!${colors.reset}`)
  console.log('')

  const confirmation = await question("Type 'DELETE' in all caps to confirm: ")

  if (confirmation !== 'DELETE') {
    console.log('Cancelled. User was not deleted.')
    rl.close()
    process.exit(0)
  }

  console.log('')
  console.log(`${colors.blue}Deleting user...${colors.reset}`)

  // Delete user using Admin API
  const { data, error: deleteError } = await supabase.auth.admin.deleteUser(selectedUser.id)

  if (deleteError) {
    console.log(`${colors.red}Error deleting user: ${deleteError.message}${colors.reset}`)
    rl.close()
    process.exit(1)
  }

  console.log(`${colors.green}✓ User deleted successfully${colors.reset}`)
  console.log('')
  console.log('Deleted:')
  console.log(`  - User: ${selectedUser.email}`)
  console.log(`  - ID: ${selectedUser.id}`)
  console.log('  - All associated data (shopping lists, etc.)')
  console.log('')
  console.log(`${colors.green}Done!${colors.reset}`)

  rl.close()
}

main().catch((error) => {
  console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`)
  rl.close()
  process.exit(1)
})
