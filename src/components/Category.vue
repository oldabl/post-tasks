<template>
  <div class="category" :class="{blurCategory}" @dragover.prevent="dragOver()" @dragleave="dragLeave()" @drop="drop">
    <h2 class="category-title" draggable="true" @dragstart="dragStart()" @dragend="dragEnd()" >
        {{name}}
    </h2>
    <div class="tasks">
      <div class="task" v-for="task in tasksFromCategorySorted(id)" :key="task.id">
        <task :task="task.description" :color="task.color" :id="task.id" :position="task.position" :categoryid="id"></task>
      </div>
      <task-drop-zone :categoryid="id" :position="this.tasksFromCategorySorted(id).length" class="drop-zone"></task-drop-zone>
      <div v-if="taskBeingDragged == null" class="new-task">
        <div v-if="!creatingNewTask">
          <button type="button" @click="newTask(id)">+ New task</button>
        </div>
        <div v-else>
          <form>
            <input v-model="taskName" type="text" ref="taskInput" placeholder="Do this, do that" />
            <button type="submit" :disabled="taskName == null || taskName.length == 0" @click="tryToCreateNewTask()">Create</button>
            <a @click="stopTaskCreation()" class="cancel-creation-link">Cancel</a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

import Task from './Task.vue';
import TaskDropZone from './TaskDropZone.vue';

export default {
  components: {
    Task,
    TaskDropZone
  },
  props: [
    'id',
    'name',
    'position'
  ],
  data() {
    return {
      blurCategory: false,
      creatingNewTask: false,
      taskName: null
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
    newTask(categoryid) {
      this.startNewTaskProcess({categoryid});
      this.creatingNewTask = true;
      this.$nextTick(function() {
        this.$refs.taskInput.focus();
      });
    },
    stopTaskCreation() {
      this.creatingNewTask = false;
      this.taskName = null;
      if(this.newTaskProcessStartedForCategory == this.id)
        this.startNewTaskProcess({null});
    },
    tryToCreateNewTask() {
      var newTask = {task: this.taskName, categoryid: this.id, position: this.tasksFromCategorySorted(this.id).length};
      this.createNewTask(newTask);
      this.stopTaskCreation();
    },
    ...mapActions([
      'startDraggingCategory',
      'changeCategoryPosition',
      'createNewTask',
      'startNewTaskProcess'
    ])
  },
  computed: {
    ...mapGetters([
      'tasks',
      'categories',
      'taskBeingDragged',
      'categoryBeingDragged',
      'newTaskProcessStartedForCategory'
    ])
  },
  watch: {
    newTaskProcessStartedForCategory(newvalue) {
      if (newvalue != this.id) {
        this.stopTaskCreation();
      }
    }
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

    .drop-zone {
      height: 100%;
    }

    .new-task {
      width: 100%;

      div {
        width: 100%;

        button {
          cursor: pointer;
          background-color: white;
          border: 1px solid #ccc;
          text-decoration: bold;
          margin: 0.2rem 0;
        }

        .cancel-creation-link {
          cursor: pointer;
          font-size: 0.6rem;
          color: red;
        }
      }
    }
  }
}

.blurCategory {
  opacity: 0.4;
}
</style>
