import Vue from 'vue';
import * as types from './mutation-types.js';

export const startDraggingTask = ({commit}, {start}) => {
  commit(types.START_DRAGGING_TASK, {start})
}
