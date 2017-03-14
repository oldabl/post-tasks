<template>
  <div class="drop-area">
    <div class="drop-zone"
      v-if="taskBeingDragged !== null"
      v-bind:class="{highlightDrop: dragOver}"
      @dragleave="dragOver = false"
      @dragover="dragOver = true"
      @dragover.prevent
      @drop="drop">
        <p>Drop here</p>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name:'drop-area',
  props: [
    'categoryid'
  ],
  data() {
    return {
      dragOver: false
    }
  },
  methods: {
    drop: function(ev) {
      this.dragOver = false;
      var taskid = this.taskBeingDragged;
      var categoryid = this.categoryid;
      this.changeTaskCategory({taskid, categoryid});
    },
    ...mapActions([
      'changeTaskCategory'
    ])
  },
  computed: {
    ...mapGetters([
      'taskBeingDragged'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.drop-area {
  background-color: white;
  width: 100%;

  .drop-zone {
    min-height: 10px;
    margin:auto;
    padding:auto;
    display:block;
    margin: auto;
    min-height: 25px;

    p {
      width: 50%;
      margin:auto;
    }
  }

  .highlightDrop {
    background-color: blue;
  }
}
</style>
