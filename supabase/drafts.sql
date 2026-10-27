-- Concepts (drafts) for the dashboard. Run once in the Supabase SQL editor.
--
-- The dashboard saves edits here first; "Publiceren" copies them into
-- site_content and empties this table. Unlike site_content there is no public
-- read policy, so visitors can never see unpublished text.
create table if not exists public.site_content_draft (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content_draft enable row level security;

drop policy if exists "authenticated all" on public.site_content_draft;
create policy "authenticated all" on public.site_content_draft
  for all to authenticated using (true) with check (true);
