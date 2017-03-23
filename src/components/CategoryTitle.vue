<template>
  <h2 class="category-title">
    <form v-if="enableTitleForm">
      <input v-model="newCategoryName" type="text" ref="categoryTitleInput" :placeholder="name" />
      <button type="submit" :disabled="newCategoryName == null || newCategoryName.length == 0" @click="tryToRenameCategory()">Change</button>
      <a @click="stopRenamingCategory()" class="cancel-creation-link">Cancel</a>
    </form>
    <span v-else @click="renameCategory(id)" class="title-click">{{name}}</span>
  </h2>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name:'category-title',
  props: [
    'id',
    'name'
  ],
  data() {
    return {
      enableTitleForm: false,
      newCategoryName: null
    }
  },
  methods: {
    renameCategory(categoryid) {
      this.startRenamingCategory({categoryid});
      this.newCategoryName = this.name;
      this.enableTitleForm = true;
      this.$nextTick(function() {
        this.$refs.categoryTitleInput.select();
      });
    },
    stopRenamingCategory() {
      this.enableTitleForm = false;
      if(this.categoryBeingRenamed == this.id)
        this.startRenamingCategory({null});
    },
    tryToRenameCategory() {
      var categoryid = this.id;
      var newname = this.newCategoryName;
      this.changeCategoryTitle({categoryid, newname});
      this.stopRenamingCategory();
    },
    ...mapActions([
      'startRenamingCategory',
      'changeCategoryTitle'
    ])
  },
  computed: {
    ...mapGetters([
      'categoryBeingRenamed'
    ])
  },
  watch: {
    categoryBeingRenamed(newvalue) {
      if (newvalue != this.id) {
        this.stopRenamingCategory();
      }
    }
  },
  created() {
    this.newCategoryName = this.name;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.category-title {
  padding: 0.2rem;
  margin: 0.2rem;
  background-color: white;

  .title-click {
    cursor: pointer;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
}

.delete-button {
  float: right;
  color: red;
}

.cancel-creation-link {
  cursor: pointer;
  font-size: 0.6rem;
  color: red;
}
</style>
