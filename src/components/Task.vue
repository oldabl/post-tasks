<template>
  <div class="task" draggable="true">
    {{task}}
  </div>
</template>

<script>
export default {
  name:'task',
  props: [
    'task'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
