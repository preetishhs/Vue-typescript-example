<template>
  <div class="create">
    <h1 class="page-title">{{ pageTitle }}</h1>
    <div class="form-container">
      <el-form label-position="top" :model="formData">
        <el-form-item label="Title">
          <el-input type="textarea" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="formData.body"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">{{
            pageTitle
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { Post } from '@/Interfaces/Posts'
const posts = namespace('posts')
@Component
export default class ModifyItem extends Vue {
  public pageTitle?: string = ''
  public isNew?: boolean = true
  public postId = 0
  public formData: Post = {
    title: '',
    id: 0,
    body: ''
  }

  @posts.Action
  public editPost!: (data: Post) => Promise<boolean>
  @posts.Action
  public createPost!: (data: Post) => Promise<boolean>
  @posts.Action
  public getPost!: (id: number) => Promise<Post>

  created() {
    this.postId = +this.$route.params.id
    if (!this.postId) {
      this.pageTitle = 'Create new Article'
    } else {
      this.isNew = false
      this.pageTitle = 'Modify Article'
      this.getPost(this.postId).then(data => {
        this.formData = data
      })
    }
  }
  public submitForm(): void {
    if (this.isNew) {
      this.createPost(this.formData)
    } else {
      this.formData.id = this.postId
      this.editPost(this.formData)
    }
  }
}
</script>
<style lang="scss" scoped>
.form-container {
  max-width: 80rem;
  padding: 4rem;
  margin: auto;
}
.el-button {
  width: 100%;
}
</style>
