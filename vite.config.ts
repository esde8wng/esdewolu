import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          profil: path.resolve(__dirname, 'profil.html'),
          kegiatan: path.resolve(__dirname, 'kegiatan.html'),
          prestasi: path.resolve(__dirname, 'prestasi.html'),
          berita: path.resolve(__dirname, 'berita.html'),
          'berita-detail': path.resolve(__dirname, 'berita-detail.html'),
          galeri: path.resolve(__dirname, 'galeri.html'),
          inovasi: path.resolve(__dirname, 'inovasi.html'),
          transparansi: path.resolve(__dirname, 'transparansi.html'),
          'layanan-publik': path.resolve(__dirname, 'layanan-publik.html'),
          spmb: path.resolve(__dirname, 'spmb.html'),
          kontak: path.resolve(__dirname, 'kontak.html')
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
