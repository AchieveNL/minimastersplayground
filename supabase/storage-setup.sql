-- Storage policies for the public `site-images` bucket.
-- Run once in the Supabase SQL editor after creating the bucket.

-- Anyone may read (the bucket is public; this states it explicitly).
drop policy if exists "site images public read" on storage.objects;
create policy "site images public read" on storage.objects
  for select using (bucket_id = 'site-images');

-- Only logged-in dashboard users may add, replace or remove images.
drop policy if exists "site images authenticated insert" on storage.objects;
create policy "site images authenticated insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-images');

drop policy if exists "site images authenticated update" on storage.objects;
create policy "site images authenticated update" on storage.objects
  for update to authenticated using (bucket_id = 'site-images');

drop policy if exists "site images authenticated delete" on storage.objects;
create policy "site images authenticated delete" on storage.objects
  for delete to authenticated using (bucket_id = 'site-images');

-- Seed the photo strip row (the slider row already exists; the dashboard
-- adds the image fields to it on the next save).
insert into public.site_content (key, value) values
  ('fotostrook', '{"afbeeldingen":[{"afbeelding":"/assets/hero-imgs/img1.webp"},{"afbeelding":"/assets/hero-imgs/img2.jpg"},{"afbeelding":"/assets/hero-imgs/img3.jpg"},{"afbeelding":"/assets/hero-imgs/img4.jpg"},{"afbeelding":"/assets/hero-imgs/img5.webp"},{"afbeelding":"/assets/hero-imgs/img6.jpg"}]}'::jsonb)
  on conflict (key) do nothing;

-- Give the existing slider row its image fields, keeping the titles as they are.
update public.site_content
set value = jsonb_set(
      value,
      '{cards}',
      (
        select jsonb_agg(
          card || jsonb_build_object(
            'afbeelding',
            coalesce(
              card ->> 'afbeelding',
              (array[
                '/assets/slider/kinderfeestje.jpg',
                '/assets/slider/entreeticket.webp',
                '/assets/slider/zaalhuur.jpg',
                '/assets/slider/scholen-bso.jpg'
              ])[ordinality]
            )
          )
          order by ordinality
        )
        from jsonb_array_elements(value -> 'cards') with ordinality as t(card, ordinality)
      )
    ),
    updated_at = now()
where key = 'slider'
  and value -> 'cards' -> 0 ->> 'afbeelding' is null;
