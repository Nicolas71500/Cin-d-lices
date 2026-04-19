import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true, // Utilisation du polling pour détecter les changements de fichiers
        },
        hmr: {
            overlay: false, // Désactivation de l'overlay HMR en cas de problème avec le hot-reloading
        },
    },
});
