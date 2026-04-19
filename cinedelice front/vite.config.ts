import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
        hmr: {
            overlay: false,
        },
        proxy: {
            '/recipes': 'http://localhost:3000',
            '/movies': 'http://localhost:3000',
            '/me': 'http://localhost:3000',
            '/login': 'http://localhost:3000',
            '/logout': 'http://localhost:3000',
            '/register': 'http://localhost:3000',
            '/users': 'http://localhost:3000',
            '/user': 'http://localhost:3000',
            '/update-password': 'http://localhost:3000',
            '/ingredient': 'http://localhost:3000',
            '/category': 'http://localhost:3000',
            '/dishtype': 'http://localhost:3000',
            '/comment': 'http://localhost:3000',
            '/likes': 'http://localhost:3000',
            '/admin': 'http://localhost:3000',
            '/Recipes': 'http://localhost:3000',
        },
    },
});
