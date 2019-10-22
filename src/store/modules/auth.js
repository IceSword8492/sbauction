const state = {
    mcid: null,
    uuid: null,
};

const mutations = {
    login (state, payload) {
        state.mcid = payload.mcid;
        state.uuid = payload.uuid;
    },
    logout (state) {
        state.mcid = null;
        state.uuid = null;
    }
};


export default {
    state,
    mutations,
};