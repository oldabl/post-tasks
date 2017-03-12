import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters.js';
import * as actions from './actions.js';
import mutations from './mutations.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    taskBeingDragged: null,
    categories: [
        {'id': 0, 'name': 'To Do'},
        {'id': 1, 'name': 'In Progress'},
        {'id': 2, 'name': 'Done'},
        {'id': 3, 'name': 'Look at Later'},
        {'id': 4, 'name': 'Not Done'},
    ],
    tasks: [
        {'id': 0, 'categoryid': 0, 'description': 'Do this', color:'yellow'},
        {'id': 1, 'categoryid': 3, 'description': 'Do that', color:'blue'},
        {'id': 2, 'categoryid': 1, 'description': 'Shut up', color:'pink'},
        {'id': 3, 'categoryid': 2, 'description': 'Stop everything', color:'yellow'}
    ]
  },
  getters,
  actions,
  mutations
})

export default store;
