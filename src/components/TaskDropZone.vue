<template>
    <div class="drop-zone"></div>
</template>

<script>
export default {
  name:'task-drop-zone'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.drop-zone {
  min-height:50px;
  overflow: hidden;
  margin-bottom: 5px;
  display: block;
  border: 2px dotted #ccc;
  background-color: #eee;
  border-radius: 4px;
}
</style>
