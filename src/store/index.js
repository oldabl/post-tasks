import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters.js';
import * as actions from './actions.js';
import mutations from './mutations.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    taskBeingDragged: null,
    categoryBeingDragged: null,
    categories: [
        {'id': 0, 'name': 'To Do', 'position': 0, 'archived': false},
        {'id': 1, 'name': 'In Progress', 'position': 1, 'archived': false},
        {'id': 2, 'name': 'Done', 'position': 2, 'archived': false},
        {'id': 3, 'name': 'Look at Later', 'position': 3, 'archived': false},
        {'id': 4, 'name': 'Not Done', 'position': 4, 'archived': false}
    ],
    tasks: [
        {'id': 0, 'categoryid': 0, 'description': 'Do this', color:'yellow', 'position': 0},
        {'id': 1, 'categoryid': 3, 'description': 'Do that', color:'blue', 'position': 0},
        {'id': 2, 'categoryid': 1, 'description': 'Shut up', color:'pink', 'position': 0},
        {'id': 3, 'categoryid': 2, 'description': 'Stop 1', color:'yellow', 'position': 2},
        {'id': 4, 'categoryid': 2, 'description': 'Stop 2', color:'yellow', 'position': 1},
        {'id': 5, 'categoryid': 2, 'description': 'Stop 3', color:'yellow', 'position': 0},
        {'id': 6, 'categoryid': 1, 'description': 'Do that again haha', color:'yellow', 'position': 1}
    ]
  },
  getters,
  actions,
  mutations
})

export default store;
