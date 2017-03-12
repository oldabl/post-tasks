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
      }
      return task;
    });
  }
}
