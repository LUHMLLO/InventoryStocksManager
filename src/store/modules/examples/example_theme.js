const state = {
    theme: 'dark',
}

const getters = {
    current(state) {
        return state.theme
    },
}

const mutations = {
    toggle(state) {
        switch (state.theme) {
            case 'dark':
                state.theme = 'light'
                break
            case 'light':
                state.theme = 'dark'
                break
        }
        localStorage.setItem('theme', state.theme)
        //console.log(`saved: ${localStorage.getItem('theme')}`)
        //console.log(`current from toggle: ${state.theme}`)
    },

    fetch(state) {
        //console.log(`retrieved: ${localStorage.getItem('theme')}`)
        if (localStorage.getItem('theme')) {
            state.theme = localStorage.getItem('theme')
        } else {
            state.theme = 'dark'
        }
        //console.log(`current from retrieved: ${state.theme}`)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}
