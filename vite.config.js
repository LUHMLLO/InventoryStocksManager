import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import { VitePWA } from 'vite-plugin-pwa'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
    base: '/',
    resolve: {
        alias: {
            '@': require('path').resolve(__dirname, 'src'),
            '~/': require('path').resolve(__dirname, 'src'),
        },
    },
    build: {
        cssCodeSplit: true,
    },
    optimizeDeps: {
        include: ['vue', 'vue-router', 'vuex'],
        exclude: [],
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith('min-') || tag.startsWith('ion-'),
                },
            },
        }),
        VueI18n({
            runtimeOnly: true,
            compositionOnly: true,
            include: require('path').resolve(__dirname, 'src/locales/**'),
        }),
        Components({
            dirs: ['src/components'],
            extensions: ['vue'],
            deep: true,
            dts: false,
            globalComponentsDeclaration: false,
            directoryAsNamespace: true,
            globalNamespaces: [],
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        }),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                cleanupOutdatedCaches: true,
                sourcemap: true,
            },
            includeAssets: ['icons/favicon.svg', 'pwa/robots.txt', 'icons/pwa-192x192.png', 'icons/pwa-512x512.png', 'icons/apple-touch-icon.png'],
            manifest: {
                name: 'InventoryStocksManager',
                short_name: 'InventoryStocksManager',
                description: 'InventoryStocksManager',
                lang: 'en-US',
                start_url: './',
                display: 'standalone',
                orientation: 'portrait',
                theme_color: '#000000',
                icons: [
                    {
                        src: 'icons/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'icons/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: 'icons/apple-touch-icon.png',
                        sizes: '180x180',
                        type: 'image/png',
                    },
                ],
                background_color: '#000000',
                prefer_related_applications: true,
            },
        }),
    ],
})
