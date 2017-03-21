import _ from 'lodash';

import Vue from 'vue';
import * as types from './mutation-types.js';

export default {
  [types.START_DRAGGING_TASK] (state, {task}) {
    Vue.set(state, 'taskBeingDragged', task);
  },
  [types.CHANGE_TASK_POSITION] (state, {taskid, categoryid, position}) {
    // Get task that needs moving
    var taskToChange = _.find(state.tasks, {'id': taskid});
    // Just in case we try to do something nasty
    if (taskToChange.categoryid == categoryid && taskToChange.position == position)
      return taskToChange;
    // Change new category positions where task is dropped
    _.map(_.filter(state.tasks, {'categoryid': categoryid}), task => {
      // For category where task arrives
      if (categoryid != taskToChange.categoryid) {
        if (task.position >= position)
          task.position++;
      }
      if (categoryid == taskToChange.categoryid && position < taskToChange.position) {
        if (task.position >= position && task.position < taskToChange.position) {
          task.position++;
        }
      }
      if (categoryid == taskToChange.categoryid && position > taskToChange.position) {
        if (task.position > taskToChange.position && task.position < position) {
          task.position--;
        }
      }
      return task;
    });
    // Change old category positions from which the task has left
    _.map(_.filter(state.tasks, {'categoryid': taskToChange.categoryid}), task => {
      // For category where task arrives
      if (categoryid != taskToChange.categoryid) {
        if (task.position > taskToChange.position)
          task.position--;
      }
      return task;
    });
    // Update task moved position and category
    taskToChange.categoryid = categoryid;
    var newposition = position;
    if (categoryid == taskToChange.categoryid && position > taskToChange.position)
      newposition = position-1;
    taskToChange.position = newposition;
    // Return task updated
    return taskToChange;
  },
  [types.START_NEW_TASK_PROCESS] (state, {categoryid}) {
    Vue.set(state, 'newTaskProcessStartedForCategory', categoryid);
  },
  [types.CREATE_NEW_TASK] (state, {task, categoryid, position}) {
    state.tasks.push({'id': 5, 'categoryid': categoryid, 'description': task, 'color': 'white', 'position': position});
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
  [types.CHANGE_ACTIVE_DROPZONE] (state, {coordinates}) {
    Vue.set(state, 'activeDropZone', coordinates);
  },
  [types.START_RENAMING_CATEGORY] (state, {categoryid}) {
    Vue.set(state, 'categoryBeingRenamed', categoryid);
  },
  [types.CHANGE_CATEGORY_TITLE] (state, {categoryid, newname}) {
    var categoryToChange = _.find(state.categories, {'id': categoryid});
    categoryToChange.name = newname;
  }
}
