<template>
  <div class="project">
    <h1 class="project-title">Project</h1>
    <div class="categories">
      <div class="category" v-for="category in categories" :key="category.id">
        <h2 class="category-title">{{category.name}}</h2>
        <drop-area :categoryid="category.id"></drop-area>
        <div class="tasks">
          <task v-for="task in tasks" :key="task.id" :task="task.description"></task>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from './Task.vue';
import DropArea from './DropArea.vue';
export default {
  components: {
    Task,
    DropArea
  },
  data () {
    return {
      categories: [
        {'id': 0, 'name': 'To Do'},
        {'id': 1, 'name': 'In Progress'},
        {'id': 2, 'name': 'Done'}
      ],
      tasks: [
        {'id': 0, 'categoryid': 0, 'description': 'Do this'},
        {'id': 1, 'categoryid': 0, 'description': 'Do that'},
        {'id': 2, 'categoryid': 1, 'description': 'Shut up'},
        {'id': 3, 'categoryid': 2, 'description': 'Stop everything'}
      ],
    }
  },
  methods: {
    setDisplay() {
      this.display = true;
    },
    tasksFromCategory(id) {
      return _.map(this.tasks, task => {
        console.log(id);
        if (task.categoryid === id) {
          console.log(task);
          return task;
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.project {
  width: 100%;

  .category {
    display: block;
    float: left;
    width: 30%;
  }
}
</style>
