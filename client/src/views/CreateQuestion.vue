<template>
    <div>
        <NavBar></NavBar>
        <side-nav-bar></side-nav-bar>
      <div class="container" style="max-width: 60%; margin-top:20px;">
        <button type="button" class="close" @click="closeFormQuestion">&times;</button>
        <form @submit.prevent="createQuestion">
            <label>Title</label>
            <br>
            <input type="text" v-model="title" required placeholder="Input your title of question" class="form-control" width="50%;">
            <br>
            <label>Tags</label>
            <br>
            <vue-tags-input
                v-model="tag"
                :tags="tags"
                @tags-changed="newTags => tags = newTags" :allow-edit-tags='true'
            />
            <br>
            <label>Description</label>
            <br>
            <ckeditor :editor="editor" v-model="editorData"></ckeditor>
            <br>
            <input type="submit" class="btn btn-warning" value="Create Question">
        </form>
      </div>
    </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueTagsInput from '@johmun/vue-tags-input'
import NavBar from '../components/NavBar'
import SideNavBar from '../components/SideNavBar'
import router from '../router'
export default {
  components: {
    VueTagsInput,
    NavBar,
    SideNavBar
  },
  data () {
    return {
      title: '',
      tag: '',
      tags: [],
      description: '',
      editor: ClassicEditor,
      editorData: ''
    }
  },
  methods: {
    closeFormQuestion () {
      router.push('/')
    },
    createQuestion () {
      let temp = []
      for (let i = 0; i < this.tags.length; i++) {
        temp.push(this.tags[i].text)
      }
      let payload = {
        title: this.title,
        tags: temp,
        description: this.editorData
      }
      this.$store.dispatch('createQuestion', payload)
      this.$store.dispatch('setListQuestion')
      this.showFormQuestion = false
      this.title = ''
      this.tags = []
      this.description = ''
      router.push('/')
    }
  }
}
</script>

<style>

</style>
