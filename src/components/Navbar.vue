<template>
  <div class="nav">
    <div>
      <router-link :to="{ name: 'home' }" tag="div" class="nav-text">
        Vue + TS Blog
      </router-link>
    </div>
    <div class="main-links">
      <router-link :to="{ name: 'home' }" tag="div" class="nav-item">
        Home
      </router-link>
      <router-link :to="{ name: 'modify' }" tag="div" class="nav-item">
        Edit / Delete
      </router-link>
      <router-link :to="{ name: 'create' }" tag="div" class="nav-item">
        Create new
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Navbar extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/responsive';
.nav {
  width: 100%;
  height: 6rem;
  background-color: #242424;
  color: #fff;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 4rem;
  justify-content: space-around;
  @include respond(tab) {
    min-height: 9rem;
    padding: 0 1rem;
  }
  .nav-text {
    padding: 0.5rem 0.5rem;
    font-size: 2.4rem;
    color: #fff;
  }
  .main-links {
    display: flex;
    align-items: center;
    .nav-item {
      padding: 0.5rem 2rem;
      font-size: 2rem;
      &:hover {
        color: aquamarine;
        cursor: pointer;
      }
      &.router-link-exact-active {
        color: aquamarine;
      }
    }
  }
}
</style>
