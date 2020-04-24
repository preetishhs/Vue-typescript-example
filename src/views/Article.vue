<template>
  <div class="blog">
    <h1 class="page-title">Article</h1>
    <div class="main">
      <div class="banner-container">
        <img
          src="https://scx2.b-cdn.net/gfx/news/hires/2019/2-nature.jpg"
          class="banner"
        />
      </div>

      <h1 class="page-title article-title">{{ article.title }}</h1>
      <div class="article-description">{{ article.body }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const posts = namespace('posts')
interface ArticleStructure {
  id: number
  title: string
  body: string
}
@Component
export default class Article extends Vue {
  public article: object = {}
  @posts.State
  public list!: Array<ArticleStructure>

  @posts.Action
  public getPost!: (id: number) => Promise<object>

  created() {
    this.getArticle(+this.$route.params.id)
  }

  public getArticle(id: number): void {
    this.getPost(id).then(data => {
      this.article = data
    })
  }
}
</script>
<style lang="scss" scoped>
.banner-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  .banner {
    width: 100%;
    height: 30rem;
    object-fit: cover;
    display: block;
  }
}
.article-title {
  font-size: 22px;
}
.article-description {
  width: 60rem;
  font-size: 16px;
  margin: auto;
}
</style>
