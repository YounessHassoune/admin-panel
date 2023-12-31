# Admin Panel Project

This project is an admin panel built using Next.js and supabase that allows managing admin lists, businesses, and viewing global statistics on the dashboard page.

## Features

- **Admin Management**: Ability to view and manage admin users.
- **Businesses Management**: Creation and management of businesses.
- **Dashboard**: View global statistics and insights.

## Installation

### Prerequisites

- `Node.js` (v16 or above)
- `pnpm` package manager

### Steps

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd admin-panel
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   Create a .env.local file in the root of the project and add the following:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://dclvbijgozjuyrwbjcgd.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<Your Supabase Anon Key>
   SERVICE_ROLE_KEY=<Your Service Role Key>
   RESEND_API_KEY=<Your Resend API Key>
   NEXT_PUBLIC_VERCEL_URL=<Your Vercel URL>
   ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open http://localhost:3000 to view the project in your browser.

## Live Production Preview

[Live Preview Link](https://admin-panel-ten-gray.vercel.app/login)

To access the live preview of the application, please use the following login credentials:

### SuperAdmin Account

- **Email:** superadmin@admin.com
- **Password:** 123456

### Admin Account

- **Email:** admin@admin.com
- **Password:** 654321

## Creator

- **Name:** Youness Hassoune
- **website:** [younesshassoune](https://younesshassoune.com/)
