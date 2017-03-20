<template>
  <div class="task-area" @dragover="dragOver()" @drop="drop()" :class="{showDrop: taskBeingDragged != null}">
    <div v-if="taskBeingDragged != null">
      <task-drop-zone></task-drop-zone>
    </div>
    <div class="task">
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

import TaskDropZone from './TaskDropZone.vue';

export default {
  name:'empty-task',
  props: [
    'position',
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
      'changeActiveDropZone',
      'changeTaskPosition'
    ]),
    dragOver() {
      if (!(this.activeDropZone != null && this.activeDropZone.coordinates != null && this.activeDropZone.coordinates.categoryid == this.categoryid && this.activeDropZone.coordinates.position == this.position)) {
        if (this.taskBeingDragged != null && this.taskBeingDragged.id != this.id) {
          var coordinates = {'categoryid': this.categoryid, 'position': this.position};
          this.changeActiveDropZone({coordinates});
        }
      }
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
      if (newvalue == null || newvalue.coordinates == null) this.dragover = false;
      else if (newvalue.coordinates.categoryid != this.categoryid || newvalue.coordinates.position != this.position) this.dragover = false;
      else this.dragover = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.task-area {
  background-color: #ddd;
  display: none;

  .task {
    width: 100%;
  }
}

.showDrop {
  display:block;
}
</style>
