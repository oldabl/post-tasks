import _ from 'lodash';

import Vue from 'vue';
import * as types from './mutation-types.js';

export default {
  [types.START_DRAGGING_TASK] (state, {task}) {
    Vue.set(state, 'taskBeingDragged', task);
  },
  [types.CHANGE_TASK_POSITION] (state, {taskid, categoryid, position}) {
    _.map(state.tasks, task => {
      if (task.id == taskid) {
        task.categoryid = categoryid;
        task.position = position;
      } else {
        if(task.categoryid == categoryid && task.position >= position)
          task.position++;
      }
      return task;
    });
  },
  [types.START_NEW_TASK_PROCESS] (state, {categoryid}) {
    Vue.set(state, 'newTaskProcessStartedForCategory', categoryid);
  },
  [types.CREATE_NEW_TASK] (state, {task, categoryid, position}) {
    state.tasks.push({'id': 5, 'categoryid': categoryid, 'description': task, color:'white', 'position': position});
  },
  [types.START_DRAGGING_CATEGORY] (state, {categoryid}) {
    Vue.set(state, 'categoryBeingDragged', categoryid);
  },
  [types.CHANGE_CATEGORY_POSITION] (state, {categoryid, oldcategoryposition, newcategoryposition}) {
    _.map(state.categories, category => {
      if (category.id == categoryid) {
        category.position = newcategoryposition;
      } else if (category.position == newcategoryposition) {
        category.position = oldcategoryposition;
      }
      return category;
    });
    Vue.set(state, 'categoryBeingDragged', null);
  },
  [types.CHANGE_ACTIVE_DROPZONE] (state, {categoryid, position}) {
    Vue.set(state, 'activeDropZone', {'categoryid': categoryid, 'position': position});
  }
}
