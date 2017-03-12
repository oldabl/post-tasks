<template>
  <div class="task" draggable="true" @dragstart="startDraggingTask({taskid: id})" @dragend="startDraggingTask({taskid: null})" v-bind:style="{ backgroundColor: color }">
    {{task}}
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name:'task',
  props: [
    'task',
    'color',
    'id'
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
  padding: 0.3rem;
  font-size: 1.2rem;
  box-shadow: 3px 3px 1px 0px #666;
  width: 90%;
}
</style>
