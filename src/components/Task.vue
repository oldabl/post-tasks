<template>
  <div class="task-area" @dragover="dragOver()" @drop="drop()">
    <div v-if="dragover && taskBeingDragged != null && taskBeingDragged.id != id && !isTaskNeighbouring()">
      <task-drop-zone></task-drop-zone>
    </div>
    <div class="task" draggable="true" @dragstart="dragStart()" @dragend="dragEnd()" v-bind:style="{ backgroundColor: color }">
      <p>{{task}}</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

//<task-drop-zone :categoryid="categoryid" :position="position" class="drop-zone"></task-drop-zone>
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
  data() {
    return {
      dragover: false
    }
  },
  computed: {
    ...mapGetters([
      'taskBeingDragged',
      'activeDropZone'
    ]),
  },
  methods: {
    ...mapActions([
      'startDraggingTask',
      'changeActiveDropZone',
      'changeTaskPosition'
    ]),
    dragStart() {
      // Store id of task being dragged
      var task = {'id': this.id, 'categoryid': this.categoryid, 'position': this.position};
      this.startDraggingTask({task: task});
    },
    dragEnd() {
      // Finished the task drag, notify store
      this.startDraggingTask({task: null});
      this.changeActiveDropZone({coordinates: null});
    },
    dragOver() {
      if (!(this.activeDropZone != null && this.activeDropZone != null && this.activeDropZone.categoryid == this.categoryid && this.activeDropZone.position == this.position)) {
        if (this.taskBeingDragged != null && this.taskBeingDragged.id != this.id) {
          var coordinates = {'categoryid': this.categoryid, 'position': this.position};
          this.changeActiveDropZone({coordinates});
        }
      }
    },
    isTaskNeighbouring() {
      return this.taskBeingDragged.categoryid == this.categoryid && this.taskBeingDragged.position == this.position - 1;
    },
    drop() {
      if(this.taskBeingDragged != null && this.taskBeingDragged.id != this.id) {
        var taskid = this.taskBeingDragged.id;
        var categoryid = this.categoryid;
        var position = this.position;
        this.changeTaskPosition({taskid, categoryid, position});
      }
      this.changeActiveDropZone({coordinates: null});
    }
  },
  watch: {
    activeDropZone(newvalue) {
      if (newvalue == null || newvalue == null) this.dragover = false;
      else if (newvalue.categoryid != this.categoryid || newvalue.position != this.position) this.dragover = false;
      else this.dragover = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.task-area {
  background-color: #ddd;

  .task {
    width: 100%;
    border: 0.1rem solid #ccc;
    box-shadow: 2px 2px 2px #888888;

    p {
      padding: 0 0.4rem;
    }
  }
}
</style>
