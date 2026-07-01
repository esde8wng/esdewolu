import { supabase } from './supabase';

export type SchoolConfig = Record<string, any>;
export type HeroSlide = Record<string, any>;
export type Quote = Record<string, any>;
export type VisionMission = Record<string, any>;
export type Teacher = Record<string, any>;
export type Facility = Record<string, any>;
export type Innovation = Record<string, any>;
export type NewsItem = Record<string, any>;
export type Achievement = Record<string, any>;
export type Activity = Record<string, any>;
export type GalleryItem = Record<string, any>;
export type TransparencyDoc = Record<string, any>;
export type PublicServiceSop = Record<string, any>;
export type SpmbRegistration = Record<string, any>;
export type LaporReport = Record<string, any>;
export type FiqItem = Record<string, any>;
export type QuickMenuItem = Record<string, any>;
export type VisitorMessage = Record<string, any>;

const SUPABASE_TIMEOUT = 10000;

async function withTimeout<T>(promise: Promise<T>, ms = SUPABASE_TIMEOUT): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Supabase request timeout')), ms)
    ),
  ]);
}

async function retry<T>(fn: () => Promise<T>, attempts = 2, delay = 500): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    if (attempts <= 1) throw e;
    await new Promise(r => setTimeout(r, delay));
    return retry(fn, attempts - 1, delay * 2);
  }
}

async function getJSON<T>(table: string, key = 'main'): Promise<T | null> {
  try {
    const { data, error } = await withTimeout(
      Promise.resolve(supabase.from(table).select('data').eq('id', key).single())
    );
    if (error || !data) return null;
    return data.data as T;
  } catch (e) {
    console.warn(`[db] getJSON ${table} fallback:`, (e as Error).message);
    return null;
  }
}

async function setJSON<T>(table: string, value: T, key = 'main') {
  try {
    const { error } = await withTimeout(
      Promise.resolve(supabase.from(table).upsert({ id: key, data: value, updated_at: new Date().toISOString() }))
    );
    if (error) throw error;
  } catch (e) {
    console.warn(`[db] setJSON ${table} failed:`, (e as Error).message);
    throw e;
  }
}

async function getAll<T>(table: string, orderBy = 'id'): Promise<T[]> {
  try {
    const { data, error } = await withTimeout(
      Promise.resolve(supabase.from(table).select('*').order(orderBy, { ascending: true }))
    );
    if (error) return [];
    return (data || []) as T[];
  } catch (e) {
    console.warn(`[db] getAll ${table} fallback:`, (e as Error).message);
    return [];
  }
}

async function insertOne<T extends { id?: any }>(table: string, value: T) {
  try {
    const { data, error } = await withTimeout(
      Promise.resolve(supabase.from(table).insert(value).select().single())
    );
    if (error) throw error;
    return data as T;
  } catch (e) {
    console.warn(`[db] insertOne ${table} failed:`, (e as Error).message);
    throw e;
  }
}

async function clearTable(table: string) {
  try {
    const { error } = await withTimeout(
      Promise.resolve(supabase.from(table).delete().neq('id', 0))
    );
    if (error) throw error;
  } catch (e) {
    console.warn(`[db] clearTable ${table} failed:`, (e as Error).message);
    throw e;
  }
}

export const db = {
  schoolConfig: {
    get: () => getJSON<SchoolConfig>('school_config'),
    set: (v: SchoolConfig) => setJSON('school_config', v),
  },
  heroSlides: {
    getAll: () => getAll<HeroSlide>('hero_slides', 'sort_order'),
    replace: async (items: HeroSlide[]) => {
      await clearTable('hero_slides');
      for (const item of items) {
        await supabase.from('hero_slides').insert(item);
      }
    },
  },
  motivationQuote: {
    get: () => getJSON<Quote>('motivation_quote'),
    set: (v: Quote) => setJSON('motivation_quote', v),
  },
  visionMission: {
    get: () => getJSON<VisionMission>('vision_mission'),
    set: (v: VisionMission) => setJSON('vision_mission', v),
  },
  teachers: {
    getAll: () => getAll<Teacher>('teachers', 'sort_order'),
    replace: async (items: Teacher[]) => {
      await clearTable('teachers');
      for (const item of items) {
        await supabase.from('teachers').insert(item);
      }
    },
  },
  facilities: {
    getAll: () => getAll<Facility>('facilities', 'sort_order'),
    replace: async (items: Facility[]) => {
      await clearTable('facilities');
      for (const item of items) {
        await supabase.from('facilities').insert(item);
      }
    },
  },
  innovations: {
    getAll: () => getAll<Innovation>('innovations', 'sort_order'),
    replace: async (items: Innovation[]) => {
      await clearTable('innovations');
      for (const item of items) {
        await supabase.from('innovations').insert({ ...item, impact: item.impact || [] });
      }
    },
  },
  newsItems: {
    getAll: () => getAll<NewsItem>('news_items', 'id'),
    replace: async (items: NewsItem[]) => {
      await clearTable('news_items');
      for (const item of items) {
        await supabase.from('news_items').insert({ ...item, tags: item.tags || [] });
      }
    },
  },
  achievements: {
    getAll: () => getAll<Achievement>('achievements', 'id'),
    replace: async (items: Achievement[]) => {
      await clearTable('achievements');
      for (const item of items) {
        await supabase.from('achievements').insert(item);
      }
    },
  },
  activities: {
    getAll: () => getAll<Activity>('activities', 'sort_order'),
    replace: async (items: Activity[]) => {
      await clearTable('activities');
      for (const item of items) {
        await supabase.from('activities').insert(item);
      }
    },
  },
  galleryItems: {
    getAll: () => getAll<GalleryItem>('gallery_items', 'id'),
    replace: async (items: GalleryItem[]) => {
      await clearTable('gallery_items');
      for (const item of items) {
        await supabase.from('gallery_items').insert(item);
      }
    },
  },
  transparencyDocs: {
    getAll: () => getAll<TransparencyDoc>('transparency_docs', 'id'),
    replace: async (items: TransparencyDoc[]) => {
      await clearTable('transparency_docs');
      for (const item of items) {
        await supabase.from('transparency_docs').insert({ ...item, budget_rows: item.budget_rows || [] });
      }
    },
  },
  publicServices: {
    getAll: () => getAll<PublicServiceSop>('public_services', 'sort_order'),
    replace: async (items: PublicServiceSop[]) => {
      await clearTable('public_services');
      for (const item of items) {
        await supabase.from('public_services').insert({
          ...item,
          requirements: item.requirements || [],
          procedure: item.procedure || [],
        });
      }
    },
  },
  spmbRegistrations: {
    getAll: () => getAll<SpmbRegistration>('spmb_registrations', 'submitted_at'),
    insert: (v: SpmbRegistration) => insertOne<SpmbRegistration>('spmb_registrations', v),
  },
  laporReports: {
    getAll: () => getAll<LaporReport>('lapor_reports', 'submitted_at'),
    insert: (v: LaporReport) => insertOne<LaporReport>('lapor_reports', v),
  },
  faqs: {
    getAll: () => getAll<FiqItem>('faqs', 'sort_order'),
    replace: async (items: FiqItem[]) => {
      await clearTable('faqs');
      for (const item of items) {
        await supabase.from('faqs').insert(item);
      }
    },
  },
  quickMenuItems: {
    getAll: () => getAll<QuickMenuItem>('quick_menu_items', 'sort_order'),
    replace: async (items: QuickMenuItem[]) => {
      await clearTable('quick_menu_items');
      for (const item of items) {
        await supabase.from('quick_menu_items').insert(item);
      }
    },
  },
  visitorMessages: {
    getAll: () => getAll<VisitorMessage>('visitor_messages', 'submitted_at'),
    insert: (v: VisitorMessage) => insertOne<VisitorMessage>('visitor_messages', v),
  },
};
