import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import axios from 'axios'

//import '../../mindesignsystem/framework/index'
import 'mindesignsystem'
import '@/assets/styles.scss'
import { fetchTheme, fetchFooterMore } from '@/functions'

import { registerSW } from 'virtual:pwa-register'

const app = createApp(App)
app.use(router).use(store)
app.provide('$axios', axios)
app.mount('#app')

fetchTheme()
fetchFooterMore()

const intervalMS = 60 * 60 * 1000

const updateSW = registerSW({
    onRegistered(r) {
        r &&
            setInterval(() => {
                r.update()
            }, intervalMS)
    },
    onRegisterError(error) {
        console.log('theres been an error: ' + error)
    },
})

updateSW()
