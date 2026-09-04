-- New parking copy (run once in Supabase SQL Editor)
update public.site_content
set value = '{"titel":"Parkeren kan bij:","garageNaam":"Parkeergarage Gouweplein - eerste 2 uur gratis","garageAdres":"Oude dreef, 2741 NJ Waddinxveen - 2 min lopen","garageGratis":"","wijk":"Parkeergelegenheid in de omliggende wijk - ca. 5 min lopen"}'::jsonb,
    updated_at = now()
where key = 'parkeren';
