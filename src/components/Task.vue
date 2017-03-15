<template>
  <div class="postit">
    <div @drop="drop" @dragover.prevent="dragOver()" @dragleave="dragLeave()" class="new-task" :class="{showSmallArea: isTaskBeingDragged, showBigArea: isTaskBeingDraggedOver}">
    </div>
    <div class="task" draggable="true" @dragstart="dragStart()" @dragend="dragEnd()" v-bind:style="{ backgroundColor: color }">
      <p>{{task}}</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name:'task',
  props: [
    'task',
    'color',
    'id',
    'position',
    'categoryid'
  ],
  data() {
    return {
      isTaskBeingDragged: false,
      isTaskBeingDraggedOver: false
    }
  },
  methods: {
    ...mapActions([
      'startDraggingTask',
      'changeTaskCategory'
    ]),
    dragStart() {
      var id = this.id;
      this.startDraggingTask({taskid: id});
    },
    dragEnd() {
      this.startDraggingTask({taskid: null});
      this.isTaskBeingDraggedOver = false;
      this.isTaskBeingDragged = false;
    },
    dragOver() {
      if(this.taskBeingDragged != null) {
        if(this.taskBeingDragged != this.id)
          this.isTaskBeingDraggedOver = true;
      }
    },
    dragLeave() {
      this.isTaskBeingDraggedOver = false;
    },
    drop(ev) {
      this.isTaskBeingDragged = false;
      this.isTaskBeingDraggedOver = false;
      if(this.taskBeingDragged != undefined || this.taskBeingDragged != null) {
        var taskid = this.taskBeingDragged;
        var categoryid = this.categoryid;
        this.changeTaskCategory({taskid, categoryid});
      }
    }
  },
  computed: {
    ...mapGetters([
      'taskBeingDragged',
      'constants'
    ])
  },
  watch: {
    taskBeingDragged(newvalue) {
      if(newvalue == null)
        this.isTaskBeingDraggedOver = false;
      if(this.taskBeingDragged != this.id)
        this.isTaskBeingDragged = (newvalue != null);
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

  .new-task {
    min-height: 0px;
    width: 100%;
    margin-bottom: 5px;
  }

  .showSmallArea {
    border: 1px dotted blue;
    border-radius: 4px;
    min-height: 25px;
  }

  .showBigArea {
    min-height: 100px;
  }
}
</style>
