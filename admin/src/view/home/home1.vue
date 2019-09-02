<template>
  <div class="container">
    444
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: true,
      transitionName: "slide-left"
    }
  },
  methods: {
    handle () {
      this.status = !this.status;
      this.transitionName = this.status ? "slide-left" : "slide-right"
    }
  },
  components: {
  }
}
</script>

<style>
</style>
