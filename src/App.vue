<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
html {
  height: 100%;
  margin: 0;
  padding: 0;

  * {
    font-family: 'Avenir Next', Roboto, Noto, sans-serif;
    -webkit-font-smoothing: antialiased;
    transition: all 0.2s cubic-bezier(.25,.8,.25,1);
  }

  body {
    font-size: 16px;
    padding: 0;
    margin: 0;
    height: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
}
</style>
