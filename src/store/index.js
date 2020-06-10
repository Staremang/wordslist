import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
  },
  getters: {
    getAllUUID: state => state.list.map(item => item.uuid),
  },
  mutations: {
    ADD_ITEM: (state, payload) => {
      state.list.push(payload);
    },
    REMOVE_ITEM: (state, { uuid }) => {
      state.list = state.list.filter(item => item.uuid !== uuid);
    },
    SET_ITEMS: (state, payload) => {
      state.list = payload;
    },
  },
  actions: {
    getFromLocal: ({ commit }) => {
      if (localStorage.getItem('favorites')) {
        try {
          const data = JSON.parse(localStorage.getItem('favorites'));
          commit('SET_ITEMS', data);
        } catch (e) {
          localStorage.removeItem('favorites');
        }
      }
    },

    saveToLocal: ({ state }) => {
      const data = JSON.stringify(state.list);
      localStorage.setItem('favorites', data);
    },

    /**
     * Добавить слово в список избранного
     */
    addToFavorite: ({ commit, dispatch }, payload) => {
      commit('ADD_ITEM', payload);

      dispatch('saveToLocal');
    },

    /**
     * Удалиить слово из списока избранного
     */
    removeFromFavorite: ({ commit, dispatch }, payload) => {
      commit('REMOVE_ITEM', payload);

      dispatch('saveToLocal');
    },

    /**
     * Обновить список избранного
     */
    updateFavorites: ({ commit, dispatch }, payload) => {
      commit('SET_ITEMS', payload);

      dispatch('saveToLocal');
    },
  },
  modules: {},
});
