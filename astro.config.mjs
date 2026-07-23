import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
    // Permite acceder al dev server por hostname (p. ej. MagicDNS de Tailscale).
    server: { allowedHosts: ['zenithseed', '.ts.net', 'localhost'] }
  },

  integrations: [react()]
});