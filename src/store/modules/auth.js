const state = {
    token: ""
};

const mutations = {
    login (state, payload) {
        state.mcid = payload.mcid;
    },
    logout (state) {
        state.mcid = null;
    }
};


export default {
    state,
    mutations,
};