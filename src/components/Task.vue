<template>
  <div class="postit">
    <div @drop="drop" @dragover.prevent="dragOver()" @dragleave="dragLeave()" class="new-task" :class="{showSmallArea, showBigArea}">
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
      showSmallArea: false,
      showBigArea: false
    }
  },
  methods: {
    ...mapActions([
      'startDraggingTask',
      'changeTaskCategory',
      'changeDropZoneCoordinates'
    ]),
    dragStart() {
      var id = this.id;
      // Store id of task being dragged
      this.startDraggingTask({taskid: id});
    },
    dragEnd() {
      // Finished the task drag, notify store
      this.startDraggingTask({taskid: null});
      // No coordinates for potential drop zone used
      this.changeDropZoneCoordinates({categoryid: null, position: null});
    },
    dragOver() {
      if(this.taskBeingDragged != null) {
        var categoryid = this.categoryid;
        var position = this.position;
        // Notify store that drop zone coordinates is here unless already here
        if (this.activeDropZone.categoryid != this.categoryid || this.activeDropZone.position != position)
          this.changeDropZoneCoordinates({categoryid: categoryid, position: position});
      }
    },
    dragLeave() {
      // Notify store that we left this drop zone
      this.changeDropZoneCoordinates({categoryid: null, position: null});
    },
    drop(ev) {
      // No active drop zone anymore
      this.changeDropZoneCoordinates({categoryid: null, position: null});
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
      'constants',
      'activeDropZone'
    ])
  },
  watch: {
    taskBeingDragged(newvalue) {
      if(newvalue == null) {
        this.showSmallArea = false;
        this.showBigArea = false;
      } else {
        if(newvalue != this.id)
          this.showSmallArea = true;
        else
          this.showSmallArea = false;
      }
    },
    activeDropZone(newvalue) {
      if(newvalue == null || (newvalue.categoryid == null && newvalue.position == null)) {
        this.showSmallArea = (this.taskBeingDragged != null);
        this.showBigArea = false;
      } else if (newvalue.categoryid == this.categoryid && newvalue.position == this.position) {
        this.showBigArea = true;
      } else {
        this.showSmallArea = false;
        this.showBigArea = false;
      }
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
    border: 2px dotted #ccc;
    background-color: #eee;
    border-radius: 4px;
    min-height: 25px;
  }

  .showBigArea {
    min-height: 100px;
  }
}
</style>
