<template>
  <div class="drop-area">
    <div class="dropZone" v-bind:class="{highlightDrop: dragOver}" @dragleave="dragOver = false" @dragover="dragOver = true" @dragover.prevent @drop="drop">
        Drop here
    </div>
  </div>
</template>

<script>
export default {
  name:'drop-area',
  props: [
    'categoryid'
  ],
  data() {
    return {
      dragOver: false
    }
  },
  methods: {
    drop: function(ev) {
      console.log(ev.target);
      console.log(this.categoryid);
      this.dragOver = false;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.drop-area {
  min-height:20px;
  background-color: gray;

  .drop-zone {
    min-height: 10px;
  }

  .highlightDrop {
    min-height: 30px;
    background-color: grey;
    border: 1px solid black;
  }
}
</style>
