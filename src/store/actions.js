import Vue from 'vue';
import * as types from './mutation-types.js';

export const startDraggingTask = ({commit}, {taskid}) => {
  commit(types.START_DRAGGING_TASK, {taskid});
}

export const changeTaskCategory = ({commit}, {taskid, categoryid}) => {
  commit(types.CHANGE_TASK_CATEGORY, {taskid, categoryid});
}

export const changeTaskPosition = ({commit}, {taskid, oldtaskposition, newtaskposition}) => {
  commit(types.CHANGE_TASK_POSITION, {taskid, taskid, oldtaskposition, newtaskposition});
}

export const startDraggingCategory = ({commit}, {categoryid}) => {
  commit(types.START_DRAGGING_CATEGORY, {categoryid});
}

export const changeCategoryPosition = ({commit}, {categoryid, oldcategoryposition, newcategoryposition}) => {
  commit(types.CHANGE_CATEGORY_POSITION, {categoryid, oldcategoryposition, newcategoryposition});
}

export const changeDropZoneCoordinates = ({commit}, {categoryid, position}) => {
  commit(types.CHANGE_DROPZONE_COORDINATES, {categoryid, position});
}
