<template>
  <div>
      <div class="row">
        <div id="mySidenav" class="sidenav">
            <a style="cursor:pointer;" href="#" @click='toPublic'>Public</a>
            <a style="cursor:pointer;" href="#" @click="toYourFeed">Your Question</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
            <a style="cursor:pointer;" href="#">Your Watch List</a>
            <div class="row mx-2">
                <div v-for="(tag, index) in user.tags" :key="index">
                    <button style="background-color:#ebde6e; border: none;" @click='filterWatch(tag)'>{{tag}}
                    </button>
                    <span type="button" class="close mr-1" style="border: none;border: none;" @click="deleteTag(tag)">&times;</span>
                </div>
            </div>
            <a style="cursor:pointer;" href="#"> Input Watched List</a>
            <vue-tags-input class="mx-2"
            v-model="tagInput"
            :tags="arrTag"
            :autocomplete-items="autocompleteItems"
            :add-only-from-autocomplete="true"
            @tags-changed="update"
            />
            <button @click="addWatch()" class="btn btn-default">Input</button>
        </div>
      </div>
    </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import router from '../router'
export default {
  components: {
    VueTagsInput
  },
  data () {
    return {
      tagInput: '',
      arrTag: [],
      autocompleteItems: [],
      debounce: null
    }
  },
  watch: {
    'tagInput': 'initItems'
  },
  computed: {
    ...mapState(['user']),
    ...mapActions(['getUser'])
  },
  methods: {
    toYourFeed () {
      router.push('/myQuestion')
    },
    toPublic () {
      router.push('/question')
    },
    deleteTag (input) {
      this.$store.dispatch('deleteTag', input)
    },
    filterWatch (input) {
      // console.log(input)
      this.$store.dispatch('filterWatch', input)
    },
    addWatch () {
      this.$store.dispatch('addTag', this.arrTag)
      this.arrTag = []
    },
    update (newTags) {
      this.autocompleteItems = []
      this.arrTag = newTags
    },
    initItems () {
      this.autocompleteItems = []
      const url = `http://localhost:3000/tag/${this.tagInput}`

      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        axios({
          url: url,
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(({ data }) => {
          console.log(data)
          //   this.autocompleteItems = data
          for (let i = 0; i < data.length; i++) {
            this.autocompleteItems.push(data[i].tag)
          }
        }).catch(() => console.warn('Oh. Something went wrong'))
      }, 600)
    }
  },
  created () {
    this.$store.dispatch('getUser')
  }
}
</script>

<style>
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 15%; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  left: 0;
  background-color: rgb(248, 248, 248); /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 8px;
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

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

vue-tags-input {
    background: #a9afb3;
  }

  .vue-tags-input .ti-new-tag-input {
    background: transparent;
    color: #b7c4c9;
  }

  .vue-tags-input .ti-input {
    padding: 4px 10px;
    transition: border-bottom 200ms ease;
  }

  /* we cange the border color if the user focuses the input */
  .vue-tags-input.ti-focus .ti-input {
    border: 1px solid #ebde6e;
  }

  /* some stylings for the autocomplete layer */
  .vue-tags-input .ti-autocomplete {
    background: #a9afb3;
    border: 1px solid #8b9396;
    border-top: none;
  }

  /* the selected item in the autocomplete layer, should be highlighted */
  .vue-tags-input .ti-item.ti-selected-item {
    background: #ebde6e;
    color: #283944;
  }

  /* style the placeholders color across all browser */
  .vue-tags-input ::-webkit-input-placeholder {
    color: #a4b1b6;
  }

  .vue-tags-input ::-moz-placeholder {
    color: #a4b1b6;
  }

  .vue-tags-input :-ms-input-placeholder {
    color: #a4b1b6;
  }

  .vue-tags-input :-moz-placeholder {
    color: #a4b1b6;
  }

  /* default styles for all the tags */
  .vue-tags-input .ti-tag {
    position: relative;
    background: #ebde6e;
    color: #283944;
  }

</style>
