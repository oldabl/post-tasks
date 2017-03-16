import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters.js';
import * as actions from './actions.js';
import mutations from './mutations.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    newTaskProcessStartedForCategory: null,
    taskBeingDragged: null,
    categoryBeingDragged: null,
    activeDropZone: {'categoryid': null, 'position': null},
    categories: [
        {'id': 0, 'name': 'To Do', 'position': 0, 'archived': false},
        {'id': 1, 'name': 'In Progress', 'position': 1, 'archived': false},
        {'id': 2, 'name': 'Done', 'position': 2, 'archived': false}
    ],
    tasks: [
        {'id': 0, 'categoryid': 0, 'description': 'Do this', color:'yellow', 'position': 0},
        {'id': 1, 'categoryid': 0, 'description': 'Do that', color:'blue', 'position': 1},
        {'id': 2, 'categoryid': 2, 'description': 'Shut up', color:'pink', 'position': 0}
    ]
  },
  getters,
  actions,
  mutations
})

export default store;
