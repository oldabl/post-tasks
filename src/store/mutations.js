import _ from 'lodash';

import Vue from 'vue';
import * as types from './mutation-types.js';

export default {
  [types.START_DRAGGING_TASK] (state, {start}) {
    state.isTaskBeingDragged = start;
  }
}
