-- RLS Policies for SD Negeri 8 Wonogiri Portal
-- Run this AFTER the schema SQL in Supabase SQL Editor

-- Enable RLS on all tables
alter table school_config enable row level security;
alter table hero_slides enable row level security;
alter table motivation_quote enable row level security;
alter table vision_mission enable row level security;
alter table teachers enable row level security;
alter table facilities enable row level security;
alter table innovations enable row level security;
alter table news_items enable row level security;
alter table achievements enable row level security;
alter table activities enable row level security;
alter table gallery_items enable row level security;
alter table transparency_docs enable row level security;
alter table public_services enable row level security;
alter table spmb_registrations enable row level security;
alter table lapor_reports enable row level security;
alter table faqs enable row level security;
alter table quick_menu_items enable row level security;
alter table visitor_messages enable row level security;

-- Public read policies (everyone can read public content)
create policy "Public read school_config" on school_config for select using (true);
create policy "Public read hero_slides" on hero_slides for select using (true);
create policy "Public read motivation_quote" on motivation_quote for select using (true);
create policy "Public read vision_mission" on vision_mission for select using (true);
create policy "Public read teachers" on teachers for select using (true);
create policy "Public read facilities" on facilities for select using (true);
create policy "Public read innovations" on innovations for select using (true);
create policy "Public read news_items" on news_items for select using (true);
create policy "Public read achievements" on achievements for select using (true);
create policy "Public read activities" on activities for select using (true);
create policy "Public read gallery_items" on gallery_items for select using (true);
create policy "Public read transparency_docs" on transparency_docs for select using (true);
create policy "Public read public_services" on public_services for select using (true);
create policy "Public read faqs" on faqs for select using (true);
create policy "Public read quick_menu_items" on quick_menu_items for select using (true);

-- Public insert policies (for forms: SPMB, LAPOR, Contact)
create policy "Public insert spmb_registrations" on spmb_registrations for insert with check (true);
create policy "Public insert lapor_reports" on lapor_reports for insert with check (true);
create policy "Public insert visitor_messages" on visitor_messages for insert with check (true);

-- Admin full access policies (authenticated users only for now)
create policy "Admin full school_config" on school_config for all using (auth.role() = 'authenticated');
create policy "Admin full hero_slides" on hero_slides for all using (auth.role() = 'authenticated');
create policy "Admin full motivation_quote" on motivation_quote for all using (auth.role() = 'authenticated');
create policy "Admin full vision_mission" on vision_mission for all using (auth.role() = 'authenticated');
create policy "Admin full teachers" on teachers for all using (auth.role() = 'authenticated');
create policy "Admin full facilities" on facilities for all using (auth.role() = 'authenticated');
create policy "Admin full innovations" on innovations for all using (auth.role() = 'authenticated');
create policy "Admin full news_items" on news_items for all using (auth.role() = 'authenticated');
create policy "Admin full achievements" on achievements for all using (auth.role() = 'authenticated');
create policy "Admin full activities" on activities for all using (auth.role() = 'authenticated');
create policy "Admin full gallery_items" on gallery_items for all using (auth.role() = 'authenticated');
create policy "Admin full transparency_docs" on transparency_docs for all using (auth.role() = 'authenticated');
create policy "Admin full public_services" on public_services for all using (auth.role() = 'authenticated');
create policy "Admin full spmb_registrations" on spmb_registrations for all using (auth.role() = 'authenticated');
create policy "Admin full lapor_reports" on lapor_reports for all using (auth.role() = 'authenticated');
create policy "Admin full faqs" on faqs for all using (auth.role() = 'authenticated');
create policy "Admin full quick_menu_items" on quick_menu_items for all using (auth.role() = 'authenticated');
create policy "Admin full visitor_messages" on visitor_messages for all using (auth.role() = 'authenticated');
