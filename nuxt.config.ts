import tailwindcss from '@tailwindcss/vite'
import presetIcons from '@unocss/preset-icons'
import path from 'path'

console.log('Core layer loaded')

export default defineNuxtConfig({
  extends: [
    'modules/auth',
  ],

  future: {
    compatibilityVersion: 4,
  },

  ssr: false,
  compatibilityDate: '2025-06-19',
  devtools: { enabled: false },

  css: [
    // PrimeVue's theme base styles (optional, as Nuxt module might handle this, but good for explicit control)
    // PrimeVue themes are now imported via JavaScript, but if you need a specific base, you might add it here.
    // However, the Nuxt module generally takes care of this.
    // 'primevue/resources/primevue.min.css', // This line is usually not needed with the Nuxt module + @primeuix/themes
    // 'primeicons/primeicons.css', // Also often handled by the PrimeVue Nuxt module
    path.resolve(__dirname, 'app/assets/css/main.css'), // Use absolute path
    // '~/assets/css/main.css', // Your custom CSS for theme overrides and other styles
  ],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@vue/devtools-api'],
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: '_nuxt/[name].[hash].js',
          chunkFileNames: '_nuxt/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css'))
              return '_nuxt/[name].[hash][extname]'
            if (assetInfo.name?.endsWith('.svg'))
              return '_nuxt/assets/img/[name].[hash][extname]'
            if (assetInfo.name?.endsWith('.woff') || assetInfo.name?.endsWith('.woff2'))
              return '_nuxt/assets/fonts/[name].[hash][extname]'
            return '_nuxt/assets/[name].[hash][extname]'
          },
        },
      },
    },
  },

  app: {
    head: {
      title: 'Atams - Link',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // {
        //   rel: 'stylesheet',
        //   href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap',
        // },
        // If you want to load other fonts shown in the image like Quicksand, Nanum, Rubik, add them here:
        // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap' },
        // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap' },
        // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap' },
      ],
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
        {
          'http-equiv': 'Content-Security-Policy',
          'content': 'default-src \'self\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'; style-src \'self\' \'unsafe-inline\'; img-src * data: blob:; font-src *; connect-src * ws:;',
        },
      ],
    },
  },

  nitro: {
    routeRules: {
      '/_nuxt/**': {
        headers: {
          'cache-control': 'public, max-age=31536000, immutable',
        },
      },
    },
    output: {
      dir: '.output',
      serverDir: '.output/server',
      publicDir: '.output/public',
    },
  },

  runtimeConfig: {
    atamsUrl: process.env.NUXT_ATAMS_API_URL,
    public: {
      // Add any public config here if needed
    },
  },

  modules: [
    '@nuxt/image',
    '@unocss/nuxt',
    '@pinia/nuxt', // Ensure @pinia/nuxt is listed only once
    '@primevue/nuxt-module', // ADDED: PrimeVue Nuxt module for auto-import
  ],

  image: {
    provider: 'ipx',
    ipx: {
      sharp: false,
    },
  },

  unocss: {
    presets: [
      presetIcons({
        scale: 1.2,
        warn: true,
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
        collections: {
          mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        },
      }),
    ],
  },

  imports: {
    // This is usually automatic, but you can be explicit
    dirs: [
      'composables',
      'composables/**'
    ]
  }
})
