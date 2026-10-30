# Favosa Farms CMS setup

The admin CMS uses Supabase Auth and PostgreSQL. Do not expose a Supabase service-role key in the application.

1. Create a Supabase project and run `migrations/20261030000000_create_admin_cms.sql` in its SQL editor.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the project API settings.
3. In Supabase Authentication, create the initial admin user with email and password. Disable public sign-ups after creating the account.
4. In the SQL editor, grant that user CMS access:

   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'admin@example.com'
   on conflict (user_id) do nothing;
   ```

5. Deploy the same two public environment variables to the hosting provider and visit `/admin/login`.

The database migration seeds the FAQs, business profile and About metrics from the current site. Confirm the contact details and business claims in the admin before publishing them. Enquiry submissions are stored in Supabase and are visible only to an authenticated CMS administrator.
