<template>
  <div id="app"
       class="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  mounted () {
  }
}
</script>

<style lang='less'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background: #e9ecf3;
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
