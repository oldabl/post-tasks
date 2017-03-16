<template>
  <div @drop="drop" @dragover.prevent="dragOver(categoryid, position)" @dragleave="dragLeave()" class="drop-zone" :class="{showSmallArea, showBigArea}">
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name:'task-drop-zone',
  props: [
    'position',
    'categoryid'
  ],
  data() {
    return {
      showSmallArea: false,
      showBigArea: false
    }
  },
  computed: {
    ...mapGetters([
      'taskBeingDragged'
    ]),
  },
  methods: {
    ...mapActions([
      'changeTaskPosition'
    ]),
    dragOver(categoryid, position) {
      if(this.taskBeingDragged != null) {
        this.showBigArea = true;
      }
    },
    dragLeave() {
      this.showBigArea = false;
    },
    drop(ev) {
      this.showBigArea = false;
      this.showSmallArea = false;
      if(this.taskBeingDragged != null) {
        var taskid = this.taskBeingDragged.id;
        var categoryid = this.categoryid;
        var position = this.position;
        this.changeTaskPosition({taskid, categoryid, position});
      }
    },
    isTaskNear(task) {
      if (task.categoryid != this.categoryid)
        return false;
      if (task.position == this.position || task.position+1 == this.position)
        return true;
      return false;
    }
  },
  watch: {
    taskBeingDragged(newvalue) {
      if(newvalue == null) {
        this.showSmallArea = false;
        this.showBigArea = false;
      } else {
        if (this.isTaskNear(newvalue)) {
          this.showSmallArea = false;
          this.showBigArea = false;
        } else {
          this.showSmallArea = true;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.drop-zone {
  display: none;
  min-height: 0px;
  width: 100%;
  margin-bottom: 5px;
}
.showSmallArea {
  display: block;
  border: 2px dotted #ccc;
  background-color: #eee;
  border-radius: 4px;
  min-height: 25px;
}

.showBigArea {
  min-height: 100px;
}
</style>
