import _ from 'lodash';

import Vue from 'vue';
import * as types from './mutation-types.js';

export default {
  [types.START_DRAGGING_TASK] (state, {taskid}) {
    state.taskBeingDragged = taskid;
  },
  [types.CHANGE_TASK_CATEGORY] (state, {taskid, categoryid}) {
    _.map(state.tasks, task => {
      if (task.id == taskid) {
        task.categoryid = categoryid;
        task.position = 0;
      } else {
        task.position++;
      }
      return task;
    });
    state.taskBeingDragged = null;
  },
  [types.CHANGE_TASK_POSITION] (state, {taskid, oldtaskposition, newtaskposition}) {
    _.map(state.tasks, task => {
      if (task.id == taskid) {
        task.position = newtaskposition;
      }
      if (task.position == newtaskposition) {
        task.position = oldtaskposition;
      }
      return task;
    });
  },
  [types.START_DRAGGING_CATEGORY] (state, {categoryid}) {
    state.categoryBeingDragged = categoryid;
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
    state.categoryBeingDragged = null;
  },
  [types.CHANGE_DROPZONE_COORDINATES] (state, {categoryid, position}) {
    state.activeDropZone = {'categoryid': categoryid, 'position': position};
  }
}
