<template>
  <div class="home">
    <h1 class="page-title">Welcome to my Blog</h1>
    <div class="card-container">
      <router-link
        v-for="post in list"
        :key="post.id"
        :to="'/article/' + post.id"
      >
        <el-card :body-style="{ padding: '0px' }" class="article">
          <img
            src="https://scx2.b-cdn.net/gfx/news/hires/2019/2-nature.jpg"
            class="image"
          />
          <div class="title">
            {{ post.title }}
          </div>
        </el-card>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const posts = namespace('posts')
@Component
export default class Home extends Vue {
  mounted() {
    this.getAllPosts()
  }
  @posts.State
  public list!: Array<object>

  @posts.Action
  public getAllPosts!: () => void
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  font-style: none;
}
</style>
