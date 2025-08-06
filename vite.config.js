import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        id: '/',
        name: 'wuumat.app',
        short_name: 'wuumat',
        description: "Finde regionale Lebensmittelautomaten & SB-Hofläden in deiner Nähe.",
        start_url: '/',
        display: 'standalone',
        background_color: '#E3FCDF',
        theme_color: '#E3FCDF',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        screenshots: [
          {
            src: "/screenshots/wuumat-preview.png",
            sizes: "720x1280",
            type: "image/png",
            form_factor: "wide"
          }
        ]
      }
    })
  ]
});
