<template>
  <div id="particles-js" class="bg-canvas" />
</template>

<script>
import 'particles.js'
export default {
  data () {
    return {
      publicPath: process.env.BASE_URL,
    }
  },
  mounted () {
    window.particlesJS.load('particles-js', `particle.json`)
  },
}
</script>

<style lang="scss" scoped>
.bg-canvas{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
