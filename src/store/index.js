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
    activeDropZone: null,
    categories: [
        {'id': 0, 'name': 'To Do', 'position': 0, 'archived': false},
        {'id': 1, 'name': 'In Progress', 'position': 1, 'archived': false},
        {'id': 2, 'name': 'Done', 'position': 2, 'archived': false}
    ],
    tasks: [
        {'id': 0, 'categoryid': 0, 'description': 'Do 1', color:'white', 'position': 0},
        {'id': 1, 'categoryid': 0, 'description': 'Do 2', color:'yellow', 'position': 1},
        {'id': 2, 'categoryid': 0, 'description': 'Do 3', color:'orange', 'position': 2},
        {'id': 3, 'categoryid': 0, 'description': 'Do 4', color:'red', 'position': 3},
        {'id': 4, 'categoryid': 1, 'description': 'Do 5', color:'black', 'position': 0}
    ]
  },
  getters,
  actions,
  mutations
})

export default store;
