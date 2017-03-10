<template>
  <div class="project-tasks">
    <div class="category">
      <div class="drop-area" v-bind:class="{display}" @dragleave="display = false" @dragover="display = true" @dragover.prevent @drop="drop">
      </div>
      <task draggable="true" v-for="task in todo" :key="task.id" :task="task.description"></task>
    </div>
    <div class="category">
      <div @dragover.prevent @drop="drop">
        Drop stuff here
      </div>
      <task draggable="true" v-for="task in inprogress" :key="task.id" :task="task.description"></task>
    </div>
    <div class="category">
      <div @dragover.prevent @drop="drop">
        Drop stuff here
      </div>
      <task draggable="true" v-for="task in done" :key="task.id" :task="task.description"></task>
    </div>
  </div>
</template>

<script>
import Task from './Task.vue';
export default {
  data () {
    return {
      todo: [
        {'id': 0, 'description': 'Do this'},
        {'id': 1, 'description': 'Do that'}
      ],
      inprogress: [
        {'id': 2, 'description': 'Shut up'}
      ],
      done: [
        {'id': 3, 'description': 'Stop everything'}
      ],
      display: false
    }
  },
  components: {
    Task
  },
  methods: {
    drop: function(ev) {
      console.log(ev.target);
      this.display = false;
    },
    setDisplay() {
      this.display = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.project-tasks {
  width: 100%;

  .category {
    display: block;
    float: left;
    width: 20%;
  }

  .drop-area {
    min-height: 10px;
  }

  .display {
    min-height: 30px;
    background-color: grey;
    border: 1px solid black;
  }
}
</style>
