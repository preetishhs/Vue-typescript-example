<template>
  <div id="app" v-loading="isLoading">
    <navbar />
    <router-view :key="$route.fullPath" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Navbar from '@/components/Navbar.vue'
import { namespace } from 'vuex-class'
const globalValues = namespace('globalValues')
@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {
  @globalValues.State
  public isLoading!: boolean
}
</script>
<style lang="scss">
body {
  font-family: 'Raleway', sans-serif;
  box-sizing: border-box;
}
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
#app {
  min-height: 100vh;
  width: 100%;
}
</style>
