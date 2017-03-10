<template>
  <div class="drop-area">
    <div v-bind:class="{display}" @dragleave="display = false" @dragover="display = true" @dragover.prevent @drop="drop">
    </div>
  </div>
</template>

<script>
export default {
  name:'drop-area',
  props: [
    'task'
  ],
  data() {
    return {
      display: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
