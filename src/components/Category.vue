<template>
  <div class="category" :class="{blurCategory}" @dragover.prevent="dragOver()" @dragleave="dragLeave()" @drop="drop">
    <h2 class="category-title" draggable="true" @dragstart="dragStart()" @dragend="dragEnd()" >
        {{name}}
    </h2>
    <div class="tasks">
      <div class="task" v-for="task in tasksFromCategorySorted(id)" :key="task.id">
        <task :task="task.description" :color="task.color" :id="task.id" :position="task.position" :categoryid="id"></task>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

import Task from './Task.vue';

export default {
  components: {
    Task
  },
  props: [
    'name',
    'id',
    'position'
  ],
  data() {
    return {
      blurCategory: false
    }
  },
  methods: {
    tasksFromCategorySorted(categoryid) {
      var tasksFromCategory = _.filter(this.tasks, function(task) {
        if (task.categoryid === categoryid) {
          return true;
        }
      });
      return _.sortBy(tasksFromCategory, function(task) {
        return task.position;
      });
    },
    dragOver() {
      this.blurCategory = (this.categoryBeingDragged != null && this.categoryBeingDragged != this.id);
    },
    dragLeave() {
      this.blurCategory = false;
    },
    dragStart() {
      var id = this.id;
      this.startDraggingCategory({categoryid: id});
    },
    dragEnd() {
      this.startDraggingCategory({categoryid: null});
    },
    drop(ev) {
      this.blurCategory = false;
      if(this.categoryBeingDragged != undefined || this.categoryBeingDragged != null) {
        var categoryid = this.categoryBeingDragged;
        var oldcategoryposition = null;
        _.map(this.categories, category => {
          if(category.id == categoryid) {
            oldcategoryposition = category.position;
          }
        });
        var newcategoryposition = this.position;
        this.changeCategoryPosition({categoryid, oldcategoryposition, newcategoryposition});
      }
    },
    ...mapActions([
      'changeTaskCategory',
      'startDraggingCategory',
      'changeCategoryPosition'
    ])
  },
  computed: {
    ...mapGetters([
      'tasks',
      'categories',
      'taskBeingDragged',
      'categoryBeingDragged'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.category {
  width: 100%;
  height: 100%;
  margin: 1rem;
  background-color: #ddd;
  padding: 0.1rem;

  .category-title {
    padding: 0.2rem;
    margin: 0.2rem;
    background-color: white;
  }

  .delete-button {
    float: right;
    color: red;
  }

  .tasks {
    margin: 0.5rem;
    height: 100%;

    .task {
      display: block;
      padding: 0;
      background-color: white;
      margin: 0.5rem 0;
    }
  }
}

.blurCategory {
  opacity: 0.4;
}
</style>
