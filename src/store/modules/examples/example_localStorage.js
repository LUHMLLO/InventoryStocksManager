const state = {
    more: false,
}

const mutations = {
    toggleMore(state) {
        state.more = !state.more
        localStorage.setItem('footerMore', JSON.stringify(state.more))
    },
    fetchMore(state) {
        if (localStorage.getItem('footerMore')) {
            state.more = JSON.parse(localStorage.getItem('footerMore'))
        }
    },
}

export default {
    namespaced: true,
    state,
    mutations,
}
