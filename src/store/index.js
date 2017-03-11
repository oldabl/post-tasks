import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters.js';
import * as actions from './actions.js';
import mutations from './mutations.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isTaskBeingDragged: false,
  },
  getters,
  actions,
  mutations
})

export default store;
