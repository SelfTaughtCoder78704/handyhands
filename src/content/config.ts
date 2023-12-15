// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a `type` and `schema` for the siteSettings collection
const siteSettingsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    siteName: z.string(),
    tagLine: z.string(),
    nav: z.array(z.object({
      href: z.string(),
      text: z.string(),
      isActive: z.boolean(),
    })),
    cards: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      text: z.string(),
      btnText: z.string(),
      link: z.string(),
    })),
    footer: z.object({
      address: z.string(),
      phone: z.string(),
      siteName: z.string(),
    }),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'siteSettings': siteSettingsCollection,
  // include other collections if any
};
