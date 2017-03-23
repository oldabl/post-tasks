<template>
  <div class="project">
    <h1 class="project-title">Post Tasks</h1>
    <div class="categories">
      <div class="category" v-for="category in categoriesFromProjectSorted(false)" :key="category.id">
        <category :name="category.name" :id="category.id" :position="category.position"></category>
      </div>
      <div class="new-category">
        <new-category></new-category>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import Category from './Category.vue';
import NewCategory from './NewCategory.vue';

export default {
  components: {
    Category,
    NewCategory
  },
  computed: {
    ...mapGetters([
      'categories'
    ])
  },
  methods: {
    categoriesFromProjectSorted(withArchived) {
      return _.sortBy(this.categories, function(category) {
        return category.position;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.project {
  width: 100%;

  .project-title {
    margin:1rem;
  }

  .categories {
    height: 100%;
    display: flex;

    .category {
      width: 200px;
      height: 100%;
      border-radius: 5px;
      margin: 0 5px;
    }

    .new-category {
      height: 100%;
      border-radius: 5px;
      margin: 0 5px;
    }
  }
}
</style>
