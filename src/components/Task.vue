<template>
  <div class="postit">
    <task-drop-zone :categoryid="categoryid" :position="position" class="drop-zone"></task-drop-zone>
    <div class="task" draggable="true" @dragstart="dragStart(id)" @dragend="dragEnd()" v-bind:style="{ backgroundColor: color }">
      <p>{{task}}</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

import TaskDropZone from './TaskDropZone.vue';

export default {
  name:'task',
  props: [
    'id',
    'task',
    'position',
    'color',
    'categoryid'
  ],
  components: {
    TaskDropZone
  },
  methods: {
    ...mapActions([
      'startDraggingTask'
    ]),
    dragStart(id, categoryid, position) {
      // Store id of task being dragged
      var task = {'id': this.id, 'categoryid': this.categoryid, 'position': this.position};
      this.startDraggingTask({task: task});
    },
    dragEnd() {
      // Finished the task drag, notify store
      this.startDraggingTask({task: null});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.postit {
  background-color: #ddd;

  .task {
    width: 100%;
    border: 0.1rem solid #ccc;
    height: 100px;
    box-shadow: 2px 2px 2px #888888;
    z-index: 0;

    p {
      padding: 0 0.4rem;
    }
  }

  .drop-zone {
    width: 100%;
    margin-top: 0.5rem;
    display:block;
  }
}
</style>
