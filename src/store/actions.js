import Vue from 'vue';
import * as types from './mutation-types.js';

export const startDraggingTask = ({commit}, {task}) => {
  commit(types.START_DRAGGING_TASK, {task});
}

export const changeTaskPosition = ({commit}, {taskid, categoryid, position}) => {
  commit(types.CHANGE_TASK_POSITION, {taskid, categoryid, position});
}

export const startNewTaskProcess = ({commit}, {categoryid}) => {
  commit(types.START_NEW_TASK_PROCESS, {categoryid});
}

export const createNewTask = ({commit}, {task, categoryid, position}) => {
  commit(types.CREATE_NEW_TASK, {task, categoryid, position});
}

export const startDraggingCategory = ({commit}, {categoryid}) => {
  commit(types.START_DRAGGING_CATEGORY, {categoryid});
}

export const changeCategoryPosition = ({commit}, {categoryid, oldcategoryposition, newcategoryposition}) => {
  commit(types.CHANGE_CATEGORY_POSITION, {categoryid, oldcategoryposition, newcategoryposition});
}

export const changeActiveDropZone = ({commit}, {coordinates}) => {
  commit(types.CHANGE_ACTIVE_DROPZONE, {coordinates});
}
