import Vue from 'vue';
import * as types from './mutation-types.js';

export const startDraggingTask = ({commit}, {taskid}) => {
  commit(types.START_DRAGGING_TASK, {taskid});
}
export const changeTaskCategory = ({commit}, {taskid, categoryid}) => {
  commit(types.CHANGE_TASK_CATEGORY, {taskid, categoryid});
}
