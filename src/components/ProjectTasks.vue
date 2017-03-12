<template>
  <div class="project">
    <h1 class="project-title">Post Tasks</h1>
    <div class="categories">
      <div class="category" v-for="category in categories" :key="category.id">
        <h2 class="category-title">{{category.name}}</h2>
        <drop-area :categoryid="category.id"></drop-area>
        <div class="tasks">
          <task class="task" v-for="task in tasksFromCategory(category.id)" :key="task.id" :task="task.description" :color="task.color" :id="task.id"></task>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import Task from './Task.vue';
import DropArea from './DropArea.vue';

export default {
  components: {
    Task,
    DropArea
  },
  data () {
    return {}
  },
  methods: {
    setDisplay() {
      this.display = true;
    },
    tasksFromCategory(id) {
      return _.filter(this.tasks, function(el) {
        if (el.categoryid === id) {
          return true;
        }
      });
    }
  },
  computed: {
    ...mapGetters([
      'tasks',
      'categories'
    ])
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
