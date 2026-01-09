-- supabase_schema.sql
-- NipponLifeV1: categories, posts, media, admins + RLS + policies + Storage bucket

-- ================
-- 0) Helpers
-- ================

-- Optional: enable uuid generation (Supabase usually already has pgcrypto)
create extension if not exists pgcrypto;

-- A helper function to check admin role via public.admins
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admins a
    where a.user_id = auth.uid()
  );
$$;

-- ================
-- 1) Tables
-- ================

-- Admins table (auth role source of truth)
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- Posts
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  status text not null default 'draft' check (status in ('draft','published')),
  category_id uuid references public.categories(id) on delete set null,
  cover_image_url text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

-- Media (metadata for uploaded assets)
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'media',
  path text not null,                -- e.g. uploads/uuid.png
  public_url text,                   -- store returned public URL if bucket is public
  mime_type text,
  size_bytes bigint,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (bucket, path)
);

-- ================
-- 2) updated_at trigger for posts
-- ================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'trg_posts_updated_at'
  ) then
    create trigger trg_posts_updated_at
    before update on public.posts
    for each row execute function public.set_updated_at();
  end if;
end $$;

-- ================
-- 3) Enable RLS
-- ================

alter table public.admins enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.media enable row level security;

-- ================
-- 4) Policies (Drop + Create to be repeatable)
-- ================

-- ADMINS table policies
drop policy if exists "admins_read_self_or_admin" on public.admins;
drop policy if exists "admins_write_admin_only" on public.admins;

create policy "admins_read_self_or_admin"
on public.admins
for select
to authenticated
using (
  auth.uid() = user_id or public.is_admin()
);

create policy "admins_write_admin_only"
on public.admins
for all
to authenticated
using ( public.is_admin() )
with check ( public.is_admin() );

-- CATEGORIES policies
drop policy if exists "categories_public_read" on public.categories;
drop policy if exists "categories_admin_full_access" on public.categories;

create policy "categories_public_read"
on public.categories
for select
to anon, authenticated
using ( true );

create policy "categories_admin_full_access"
on public.categories
for all
to authenticated
using ( public.is_admin() )
with check ( public.is_admin() );

-- POSTS policies
drop policy if exists "posts_public_read_published" on public.posts;
drop policy if exists "posts_admin_full_access" on public.posts;

create policy "posts_public_read_published"
on public.posts
for select
to anon, authenticated
using ( status = 'published' );

create policy "posts_admin_full_access"
on public.posts
for all
to authenticated
using ( public.is_admin() )
with check ( public.is_admin() );

-- MEDIA policies
drop policy if exists "media_public_read" on public.media;
drop policy if exists "media_admin_full_access" on public.media;

create policy "media_public_read"
on public.media
for select
to anon, authenticated
using ( true );

create policy "media_admin_full_access"
on public.media
for all
to authenticated
using ( public.is_admin() )
with check ( public.is_admin() );

-- ================
-- 5) Storage: bucket + policies
-- ================

-- Create Storage bucket "media" (public for MVP)
-- Note: storage schema exists in Supabase
do $$
begin
  if not exists (select 1 from storage.buckets where id = 'media') then
    insert into storage.buckets (id, name, public)
    values ('media', 'media', true);
  end if;
end $$;

-- Storage objects RLS is usually enabled by default in Supabase; ensure policies allow access.
-- Policies for storage.objects (media bucket):
-- Public read (since bucket is public) + Admin full write.

drop policy if exists "storage_media_public_read" on storage.objects;
drop policy if exists "storage_media_admin_full_access" on storage.objects;

create policy "storage_media_public_read"
on storage.objects
for select
to anon, authenticated
using ( bucket_id = 'media' );

create policy "storage_media_admin_full_access"
on storage.objects
for all
to authenticated
using ( bucket_id = 'media' and public.is_admin() )
with check ( bucket_id = 'media' and public.is_admin() );
