import store from '@/store'
import router from '@/router'
import { Clipboard } from '@capacitor/clipboard'

///------------///
/// vue vuex store
///------------///
export const tg_leaving = (url) => {
    store.commit('modals/toggleLeaving')
}

export const tg_articlePreview = (status, data) => {
    store.commit('article/toggleArticlePreview', { status, data })
}

export const tg_toast = (label, content) => {
    store.commit('modals/toggleToast', { label, content })
}

export const toggleLoading = () => {
    store.commit('states/toggleLoading')
}

export const toggleError = () => {
    store.commit('states/toggleError')
}

export const toggleTheme = () => {
    store.commit('theme/toggle')
}

export const fetchTheme = () => {
    store.commit('theme/fetch')
}

export const toggleFooterMore = () => {
    store.commit('footer/toggleMore')
}
export const fetchFooterMore = () => {
    store.commit('footer/fetchMore')
}

///------------///
/// capacitor js
///------------///
export const writeToClipboardAndRedirect = async (path, label, content) => {
    let executed = false

    if (!executed) {
        executed = !executed

        await Clipboard.write({
            string: content,
        })

        tg_toast(label, content)

        window.open(path, '_blank')

        setTimeout(function () {
            executed = !executed
        }, 2000)
    }
}
export const writeToClipboard = async (label, content) => {
    let executed = false

    if (!executed) {
        executed = !executed

        await Clipboard.write({
            string: content,
        })

        tg_toast(label, content)

        setTimeout(function () {
            executed = !executed
        }, 2000)
    }
}

///------------///
/// vue router
///------------///
export const pushWithParams = (path, params) => {
    router.push({
        name: path,
        params: params,
    })
}

export const pushTo = (path) => {
    router.push({
        name: path,
    })
}

///------------///
/// vanilla js
///------------///
export const getHexColor = (e) => {
    const color = getComputedStyle(e.currentTarget).backgroundColor
    return this.RGBToHex(color)
}

export const copyToClipboard = (StringToCopy) => {
    navigator.clipboard.writeText(StringToCopy).catch((error) => {
        console.log(error)
    })
}

export const repeat = (func, times) => {
    func()
    times && --times && repeat(func, times)
}

export const mathRandomRange = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const replaceSpacesForDash = (str) => {
    return str.replace(/\s+/g, '-')
}

export const removeSpecialCharacters = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, '')
}
