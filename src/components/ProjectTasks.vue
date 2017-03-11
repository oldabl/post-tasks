<template>
  <div class="project">
    <h1 class="project-title">Post Tasks</h1>
    <div class="categories">
      <div class="category" v-for="category in categories" :key="category.id">
        <h2 class="category-title">{{category.name}}</h2>
        <drop-area :categoryid="category.id"></drop-area>
        <div class="tasks">
          <task class="task" v-for="task in tasks" :key="task.id" :task="task.description" :color="task.color"></task>
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
        {'id': 2, 'name': 'Done'},
        {'id': 3, 'name': 'Look at Later'},
        {'id': 4, 'name': 'Not Done'},
      ],
      tasks: [
        {'id': 0, 'categoryid': 0, 'description': 'Do this', color:'yellow'},
        {'id': 1, 'categoryid': 3, 'description': 'Do that', color:'blue'},
        {'id': 2, 'categoryid': 1, 'description': 'Shut up', color:'pink'},
        {'id': 3, 'categoryid': 2, 'description': 'Stop everything', color:'yellow'}
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
  height: 100%;

  .project-title {
    margin:1rem;
  }
  .categories {
    width:100%;
    white-space:nowrap;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;

    .category {
      display: inline-block;
      width: 200px;
      position: relative;
      margin: 0.1rem;
      padding: 0.2rem 0.4rem;

      .tasks {

        .task {
          margin: 0.5rem 0rem;
          min-height: 70px;
        }
      }
    }
  }
}
</style>
