create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  media_type text not null check (media_type in ('image', 'video')),
  alt_text text not null check (char_length(alt_text) between 3 and 240),
  caption text not null default '' check (char_length(caption) <= 500),
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index gallery_items_display_order_idx
  on public.gallery_items (display_order, created_at desc);

alter table public.gallery_items enable row level security;

create policy "Published gallery items are public to read"
on public.gallery_items for select to anon, authenticated
using (true);

create policy "Admins can manage gallery items"
on public.gallery_items for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

grant select on public.gallery_items to anon, authenticated;
grant insert, update, delete on public.gallery_items to authenticated;

insert into storage.buckets (
  id, name, public, file_size_limit, allowed_mime_types
) values (
  'gallery',
  'gallery',
  true,
  104857600,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Gallery media is public to read"
on storage.objects for select to anon, authenticated
using (bucket_id = 'gallery');

create policy "Admins can upload gallery media"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'gallery'
  and (select public.is_admin())
);

create policy "Admins can update gallery media"
on storage.objects for update to authenticated
using (
  bucket_id = 'gallery'
  and (select public.is_admin())
)
with check (
  bucket_id = 'gallery'
  and (select public.is_admin())
);

create policy "Admins can delete gallery media"
on storage.objects for delete to authenticated
using (
  bucket_id = 'gallery'
  and (select public.is_admin())
);
