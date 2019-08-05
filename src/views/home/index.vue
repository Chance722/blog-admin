<template>
  <div class="home-view">
    <v-header />
    <v-aside />
    <v-main>
      <router-view slot="router-view" />
    </v-main>
  </div>
</template>

<script>
import vHeader from '@/components/Common/VHeader'
import vAside from '@/components/Common/VAside'
import vMain from '@/components/Common/VMain'

export default {
  components: {
    vHeader,
    vAside,
    vMain,
  },
}
</script>
