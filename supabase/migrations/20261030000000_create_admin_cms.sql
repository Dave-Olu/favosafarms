create extension if not exists pgcrypto;

create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.business_settings (
  id boolean primary key default true check (id),
  phone_primary text not null,
  phone_secondary text not null default '',
  whatsapp_phone text not null,
  email text not null,
  street_address text not null,
  address_locality text not null,
  postal_code text not null,
  address_region text not null,
  address_country text not null default 'NG',
  weekday_hours text not null,
  saturday_hours text not null,
  sunday_hours text not null,
  updated_at timestamptz not null default now()
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null check (char_length(question) between 3 and 240),
  answer text not null check (char_length(answer) between 3 and 5000),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.about_metrics (
  id uuid primary key default gen_random_uuid(),
  icon text not null check (icon in ('chicken', 'fish', 'graduation', 'farm', 'heart')),
  value text not null check (char_length(value) between 1 and 80),
  label text not null check (char_length(label) between 2 and 120),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  phone text not null check (char_length(phone) between 7 and 40),
  email text check (email is null or char_length(email) <= 254),
  subject text not null check (char_length(subject) between 1 and 160),
  message text not null check (char_length(message) between 5 and 5000),
  source text not null check (source in ('contact', 'consultation')),
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index faqs_display_order_idx on public.faqs (display_order, created_at);
create index about_metrics_display_order_idx on public.about_metrics (display_order, created_at);
create index inquiries_created_at_idx on public.inquiries (created_at desc);
create index inquiries_status_idx on public.inquiries (status, created_at desc);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger business_settings_set_updated_at
before update on public.business_settings
for each row execute function public.set_updated_at();

create trigger faqs_set_updated_at
before update on public.faqs
for each row execute function public.set_updated_at();

create trigger about_metrics_set_updated_at
before update on public.about_metrics
for each row execute function public.set_updated_at();

create trigger inquiries_set_updated_at
before update on public.inquiries
for each row execute function public.set_updated_at();

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.admin_users enable row level security;
alter table public.business_settings enable row level security;
alter table public.faqs enable row level security;
alter table public.about_metrics enable row level security;
alter table public.inquiries enable row level security;

create policy "Admins can read their own membership"
on public.admin_users for select to authenticated
using (user_id = (select auth.uid()));

create policy "Business settings are public to read"
on public.business_settings for select to anon, authenticated
using (true);

create policy "Admins can update business settings"
on public.business_settings for update to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "FAQs are public to read"
on public.faqs for select to anon, authenticated
using (true);

create policy "Admins can manage FAQs"
on public.faqs for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "About metrics are public to read"
on public.about_metrics for select to anon, authenticated
using (true);

create policy "Admins can manage About metrics"
on public.about_metrics for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Visitors can submit enquiries"
on public.inquiries for insert to anon, authenticated
with check (status = 'new');

create policy "Admins can read enquiries"
on public.inquiries for select to authenticated
using ((select public.is_admin()));

create policy "Admins can update enquiries"
on public.inquiries for update to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Admins can delete enquiries"
on public.inquiries for delete to authenticated
using ((select public.is_admin()));

grant select on public.business_settings, public.faqs, public.about_metrics to anon, authenticated;
grant update on public.business_settings to authenticated;
grant insert, update, delete on public.faqs, public.about_metrics to authenticated;
grant insert on public.inquiries to anon, authenticated;
grant select, update, delete on public.inquiries to authenticated;
grant select on public.admin_users to authenticated;

insert into public.business_settings (
  id, phone_primary, phone_secondary, whatsapp_phone, email,
  street_address, address_locality, postal_code, address_region,
  address_country, weekday_hours, saturday_hours, sunday_hours
) values (
  true, '+234 813 456 7890', '+234 813 456 7891', '2348073228022',
  'info@favosafarms.com', '15 FINAPS Extension, off Alameiyeseigha Road',
  'Okutuktu', '569101', 'Bayelsa', 'NG', '8:00 am – 6:00 pm',
  '8:00 am – 6:00 pm', 'Closed'
);

insert into public.faqs (question, answer, display_order) values
  ('How can I place an order?', 'You can place an order by chatting with us on WhatsApp or giving us a call. We will confirm product availability, size, pricing and delivery details before your order is finalised.', 0),
  ('What products do you offer?', 'Our range includes poultry, catfish, fresh eggs, dogs and other farm products. Visit the Products page or contact us to ask about a specific item.', 1),
  ('Are all products always available?', 'Availability and quantities can change. Please contact us before ordering so we can confirm current stock and discuss your requirements.', 2),
  ('Do you deliver?', 'We offer delivery in Yenagoa, Ogbia and surrounding communities in Bayelsa State. Contact us with your location and order details to confirm arrangements.', 3),
  ('Can I visit the farm?', 'Yes. We welcome visitors, aspiring farmers and clients. Please contact us in advance to arrange a suitable time for your visit.', 4),
  ('Do you offer training or farm consultancy?', 'Yes. We provide practical training and consultancy for poultry, catfish and integrated farming, including farm setup, management and audits.', 5),
  ('How do I book a consultation?', 'Use the Book a Consultation page, call us or message us on WhatsApp. We can discuss your goals and arrange a suitable time.', 6),
  ('When are you open?', 'We are open Monday to Saturday, 8:00 am to 6:00 pm, and closed on Sundays.', 7);

insert into public.about_metrics (icon, value, label, display_order) values
  ('chicken', '50,000+', 'Broilers Raised', 0),
  ('fish', '20,000+', 'Catfish Produced', 1),
  ('graduation', '300+', 'Farmers Trained', 2),
  ('farm', '150+', 'Farms Supported', 3),
  ('heart', 'Thousands', 'Families Served', 4);

-- After creating the first user in Supabase Authentication, grant CMS access:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'admin@example.com'
-- on conflict (user_id) do nothing;
