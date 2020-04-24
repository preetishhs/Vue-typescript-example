<template>
  <div class="home">
    <h1 class="page-title">Modify / Delete Articles</h1>
    <div class="card-container">
      <el-card
        v-for="post in list"
        :key="post.id"
        :body-style="{ padding: '0px' }"
        class="article"
      >
        <div class="overlay">
          <el-button type="primary" @click="editArticle(post.id)">
            Edit Article
          </el-button>
          <el-button type="danger" @click="deleteArticle(post.id)">
            Delete Article
          </el-button>
        </div>
        <img
          src="https://scx2.b-cdn.net/gfx/news/hires/2019/2-nature.jpg"
          class="image"
        />
        <div class="title">
          {{ post.title }}
        </div>
      </el-card>
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

  @posts.Action
  public deletePost!: (id: number) => void

  public editArticle(id: number) {
    this.$router.push({ name: 'edit', params: { id: id.toString() } })
  }
  public deleteArticle(id: number) {
    this.deletePost(id)
  }
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  font-style: none;
}
</style>
