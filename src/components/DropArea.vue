<template>
  <div class="drop-area">
    <div class="drop-zone"
      v-if="isTaskBeingDragged"
      v-bind:class="{highlightDrop: dragOver}"
      @dragleave="dragOver = false"
      @dragover="dragOver = true"
      @dragover.prevent
      @drop="drop">
        Drop here
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

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
  },
  computed: {
    ...mapGetters([
      'isTaskBeingDragged'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.drop-area {
  background-color: gray;

  .drop-zone {
    min-height: 10px;
    margin:auto;
    padding:auto;
    display:block;
  }

  .highlightDrop {
    min-height: 30px;
    background-color: grey;
    border: 1px solid black;
  }
}
</style>
