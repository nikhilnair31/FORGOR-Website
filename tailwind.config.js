/** @type {import('tailwindcss').Config} */
export default {
    // Important: Ensure this path correctly scans ALL your Astro files for classes
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    theme: {
        extend: {
            // Define custom fonts
            fontFamily: {
                display: ['DisplayFont', 'sans-serif'], // 'DisplayFont' matches your @font-face name
            },
            // Define your custom color palette
            colors: {
                purple: { // Use a nested structure for shades if you have them
                    200: '#af94de',
                    DEFAULT: '#1e1c2c', // Your primary purple
                    800: '#221f31',
                },
                neonGreen: {
                    200: '#d4ff75',
                    DEFAULT: '#deff96',
                },
                brightPurple: {
                    200: '#deccff',
                    DEFAULT: '#7654b1',
                },
            },
            borderRadius: {
              'none': '0', // Ensures 'rounded-none' maps to 0
            },
        },
    },
    plugins: [],
};