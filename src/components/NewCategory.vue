<template>
  <div class="category">
    <h2 class="category-title">
      <button type="button" @click="">+</button>
    </h2>
  </div>
</template>

<script>
export default {
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
}
</style>
