# Izzy Yum Web Application

Next.js web application for the Izzy Yum gluten-free recipe system. This is the planning and cooking companion used on desktop/laptop.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Animations:** Framer Motion
- **Deployment:** Vercel

## Prerequisites

- Node.js 20.x or higher
- npm
- Docker Desktop (for local Supabase)
- Supabase CLI

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Local Supabase

```bash
# Initialize Supabase (if not already done)
supabase init

# Start local Supabase instance
supabase start
```

After running `supabase start`, copy the `anon key` and `API URL` to your `.env.local` file.

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and update with your local Supabase credentials:

```bash
cp .env.example .env.local
```

Update `.env.local` with the values from `supabase status`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Utilities and Supabase client
├── types/            # TypeScript type definitions
└── utils/            # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Features

- **Protein Selection** - Visual grid for choosing protein
- **Cuisine Selection** - Browse recipes by cuisine
- **Recipe Discovery** - Smart filtering with ingredient wheel
- **Serving Size Calculator** - Dynamic recipe scaling
- **Shopping List Sync** - Real-time sync with iOS app
- **Substitution Tracking** - See what was changed at the store

## Learn More

- [Project Documentation](https://github.com/izzy-yum/infrastructure)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

This application is designed to be deployed on Vercel:

```bash
vercel --prod
```

See [techstack.md](https://github.com/izzy-yum/infrastructure/blob/main/techstack.md) for full deployment strategy.
