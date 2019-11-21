<template>
  <div>
    <NavBar></NavBar>
    <side-nav-bar></side-nav-bar>
      <button @click.prevent="showQuestion" class="btn btn-warning">Ask Question !</button>
     <div style="margin-left:17%; margin-right:5%;">
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
          <template v-slot:questionList>
              <div class="col-12" id="QuestionCard">
              <a href='#' @click.prevent="questionDetail(item._id)"
              style="font-size:25px; color:#fec107;">{{ item.title }}</a>
              <div class="row justify-content-center">
                <div v-for="(tag, index) in item.tags" :key='index'>
                  <button class="mx-2" style="background-color:#ebde6e; border:none;" @click="filterWatch(tag)">{{tag}}</button>
                </div>
              </div>
              <p v-html="getDescription(index)"></p>
              <p>Asked by : {{ item.UserId.name }}</p>
              </div>
          </template>
          </List>
        </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import List from '../components/List'
import router from '../router'
import { mapState } from 'vuex'
import SideNavBar from '../components/SideNavBar'
export default {
  name: 'question',
  components: {
    NavBar,
    List,
    SideNavBar
  },
  methods: {
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
    },
    showQuestion () {
      router.push('/createQuestion')
    },
    filterWatch (input) {
      this.$store.dispatch('filterWatch', input)
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
  padding: 5px;
  margin: 5px;
}
#questionList {
  padding: 5px;
}
.card {
  width: 100%;
}

</style>
