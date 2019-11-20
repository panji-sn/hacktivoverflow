<template>
  <div>
    <NavBar style="width: 100%;">
        <template v-slot:home>
        <router-link to="/" class="btn btn-primary" @click.prevent="home">Home</router-link>
        </template>
        <!-- <template v-slot:question>
        <a href="#" @click.prevent="myQuestion" class="btn btn-primary">My Questions</a>
        </template> -->
        <template v-slot:signout>
        <a href="#" class="btn btn-primary" @click.prevent="signOut" id="btn-left">SignOut</a>
        </template>
    </NavBar>
    <div>
      <div class="row">
        <div id="mySidenav" class="sidenav">
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
            <vue-tags-input
            v-model="tagInput"
            :tags="arrTag"
            :autocomplete-items="autocompleteItems"
            :add-only-from-autocomplete="true"
            @tags-changed="update"
            />
            <button @click="addWatch()">Input</button>
        </div>
      </div>
    <div>
      <button @click.prevent="showQuestion" class="btn btn-primary">Ask Question !</button>
    <div class="container" style="width: 800px" v-if="showFormQuestion">
      <button type="button" class="close" @click.prevent="closeFormQuestion">&times;</button>
      <form @submit.prevent="createQuestion">
        <label>Title</label>
        <br>
        <input type="text" v-model="title" required placeholder="Input your title of question">
        <br>
        <label>Description</label>
        <br>
        <ckeditor :editor="editor" v-model="editorData"></ckeditor>
        <br>
        <label>Tags</label>
        <br>
        <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
        />
        <br>
        <input type="submit" class="btn btn-primary" value="Create Question">
      </form>
    </div>
    <div class="container">
        <div class="row">
        <List v-for="(item, index) in listQuestion" :key="index" class="card" id="questionList">
        <template v-slot:totalVotes>
            <div class="col sm-1 ml-1">
            <h4>{{ item.upVotes.length - item.downVotes.length }}</h4>
            <h6>Votes</h6>
            </div>
        </template>
        <template v-slot:totalAnswers>
            <div class="col sm-1 ml-1">
            <h4>{{ item.answer.length }}</h4>
            <h6>Answers</h6>
            </div>
        </template>
        <!-- <template v-slot:totalViews>
            <div class="col sm-1 ml-1">
            <h4>0</h4>
            <h6>Views</h6>
            </div>
        </template> -->
        <template v-slot:questionList>
            <div class="col-6" id="QuestionCard">
            <a href='#' @click.prevent="questionDetail(item._id)">{{ item.title }}</a>
            <p v-html="getDescription(index)"></p>
            <p>Asked by : {{ item.UserId.name }}</p>
            </div>
        </template>
        </List>
    </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import List from '../components/List'
import router from '../router'
import { mapState } from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueTagsInput from '@johmun/vue-tags-input'
import axios from 'axios'
export default {
  name: 'question',
  components: {
    NavBar,
    List,
    VueTagsInput
  },
  data: () => {
    return {
      title: '',
      tag: '',
      tags: [],
      description: '',
      showFormQuestion: false,
      editor: ClassicEditor,
      editorData: '',
      tagInput: '',
      arrTag: [],
      autocompleteItems: [],
      debounce: null
    }
  },
  watch: {
      'tagInput':'initItems'
  },
  methods: {
    addWatch () {
        axios({
            url: 'http://localhost:3000/tag',
            method: 'post',
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                tags: this.arrTag
            }
        })
        .then (({data}) => {
            console.log(data)
            this.arrTag = []
        })
    },
    update(newTags) {
      this.autocompleteItems = [];
      this.arrTag = newTags;
    },
    initItems() {
      this.autocompleteItems = []
      const url = `http://localhost:3000/tag/${this.tagInput}`;

      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios({
            url : url,
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(({data}) => {
            console.log(data)
        //   this.autocompleteItems = data
          for (let i = 0; i < data.length; i++) {
              this.autocompleteItems.push(data[i].tag)
          }
        }).catch(() => console.warn('Oh. Something went wrong'));
      }, 600);
    },
    signOut () {
      localStorage.clear()
      router.push('/')
    },
    showQuestion () {
      this.showFormQuestion = true
    },
    closeFormQuestion () {
      this.showFormQuestion = false
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
    },
    questionDetail (id) {
      this.$store.dispatch('questionDetail', id)
      router.push(`/question/${id}`)
    },
    getDescription (index) {
      let arr = this.listQuestion[index]
      if (arr.description.length >= 50) {
        return arr.description.slice(0, 50) + '...'
      } else {
        return arr.description
      }
    }
  },
  computed: {
    ...mapState(['listQuestion'])
  },
  created () {
    this.$store.dispatch('setListQuestion')
  }
}
</script>

<style>
#btn-left {
  margin-right: 40px;
}
#QuestionCard {
  padding: 10px;
  margin: 10px;
}
#questionList {
  padding: 10px;
}
.card {
  width: 100%;
}
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 150px; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 10; /* Stay at the top */
  left: 0;
  background-color: rgb(248, 248, 248); /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left .5s;
  padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
