<template>
  <div>
    <NavBar class="" style="width: 100%;">
        <template v-slot:home>
        <router-link to="/" class="btn btn-warning">Home</router-link>
        </template>
        <template v-slot:question>
        <router-link to="/myQuestion" class="btn btn-warning">My Questions</router-link>
        </template>
        <template v-slot:signout>
        <a href="#" class="btn btn-warning" @click.prevent="signOut" id="btn-left">SignOut</a>
        </template>
    </NavBar>
    <side-nav-bar></side-nav-bar>
    <div style="margin-left:17%; margin-right:5%;">
        <div class="row">
            <List v-for="(item, index) in arrMyQuestion" :key="index" class="card" id="questionList">
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
                        <button class="mx-2" style="background-color:#ebde6e; border:none;">{{tag}}</button>
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
import SideNavBar from '../components/SideNavBar'
import List from '../components/List'
import router from '../router'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    NavBar,
    SideNavBar,
    List
  },
  computed: {
    ...mapState(['arrMyQuestion']),
    ...mapActions(['getMyQuestion'])
  },
  methods: {
    signOut () {
      localStorage.clear()
      router.push('/')
    },
    questionDetail (id) {
      this.$store.dispatch('questionDetail', id)
      router.push(`/question/${id}`)
    },
    getDescription (index) {
      let arr = this.arrMyQuestion[index]
      if (arr.description.length >= 50) {
        return arr.description.slice(0, 50) + '...'
      } else {
        return arr.description
      }
    }
  },
  created () {
    this.$store.dispatch('getMyQuestion')
  }
}
</script>

<style>

</style>
