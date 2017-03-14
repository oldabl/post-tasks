<template>
  <div class="task" draggable="true" @dragstart="startDraggingTask({taskid: id})" @dragend="startDraggingTask({taskid: null})" v-bind:style="{ backgroundColor: color }">
    <p>{{task}}</p>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name:'task',
  props: [
    'task',
    'color',
    'id',
    'position'
  ],
  methods: {
    ...mapActions([
      'startDraggingTask'
    ])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.task {
  width: 100%;
  border: 0.1rem solid #ccc;
  height: 100px;
  box-shadow: 2px 2px 2px #888888;

  p {
    padding: 0 0.4rem;
  }
}
</style>
