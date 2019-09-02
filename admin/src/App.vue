<template>
  <div id="app"
       class="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'app',
  components: {
  },
  computed: {

  },
  methods: {
    ...mapMutations(['SETUSERINFO'])
  },
  mounted () {
    const userInfo = util.getLocalStorage('userInfo');
    if (userInfo) {
      this.SETUSERINFO(JSON.parse(userInfo));
    } else {

    }
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
.container {
  width: 100%;
  height: 100%;
}
.container-box {
  overflow-y: auto;
}
</style>
