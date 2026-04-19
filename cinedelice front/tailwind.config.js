/** @type {import('tailwindcss').Config} */

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'light-red':    '#c0392b',
                'dark-red':     '#1a1b27',
                gold:           '#d4a843',
                'gold-light':   '#f0c96a',
                skin:           '#e8d5c0',
                'skin-muted':   '#a89080',
                'light-grey':   '#f0e6d6',
                dark:           '#0d0e14',
                'bg-card':      '#1a1b27',
                'bg-hover':     '#22233a',
                'visited-link': '#d4a843',
            },
            screens: {
                'bp-s':          '480px',
                'bp-m':          '768px',
                'bp-l':          '1024px',
                'bp-desktop-s':  '1224px',
                'bp-desktop-m':  '1440px',
                'bp-desktop-l':  '1600px',
            },
            spacing: {
                '0.5em': '0.5em',
                '1em':   '1em',
                '1.2em': '1.2em',
                '1.5em': '1.5em',
                '2em':   '2em',
                '2.5em': '2.5em',
                '3em':   '3em',
                '4em':   '4em',
                '5em':   '5em',
                '90%':   '90%',
            },
            fontFamily: {
                cinzel: ['Cinzel', 'serif'],
                body:   ['Merriweather Sans', 'sans-serif'],
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};
