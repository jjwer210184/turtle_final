
<template>
  <div>
      <b-modal id="createRoom" title="Create New Room" @ok="createRoom" @cancel="reset">
      <b-container>
        <b-row class="mb-3">
          <b-col cols="3">
            <div>Room Title</div>
          </b-col>
          <b-col cols="9">
            <b-form-input v-model="newRoom.title" placeholder="Enter your Room Title"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="3">
            <div>Article</div>
          </b-col>
          <b-col cols="9">
            <b-form-textarea
              id="article"
              v-model="newRoom.article"
              placeholder="Enter your article..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col cols="3">
            <div>Question</div>
          </b-col>
          <b-col cols="9">
            <b-form-textarea
              id="article"
              v-model="newRoom.question"
              placeholder="Enter your question..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-col>
        </b-row>

  
      </b-container>
      </b-modal>
    </div>
</template>

<script>
import { db } from '../db.js'

export default {
  name: 'CreateRoom',
  data() {
    return {
      newRoom: {
        userId: '',
        title: '',
        article: '',
        question: '',

      }
    }
  },
  watch: {
    '$store.state.user.data.uid': {
      handler(val) {
        if(val) {
          this.newRoom.userId = val
        }
      }
    }
  },
  methods: {
    async createRoom() {
      this.newRoom.userId = this.$store.state.user.data.uid
      await db.collection('rooms').doc().set({
        name: this.newRoom.title
      })
      await db.collection(this.newRoom.title).doc('initial').set(this.newRoom)
      this.$router.push({name: 'chat', params: {roomtitle: this.newRoom.title}});
      this.reset()
    },
    reset() {
      this.newRoom.title = ''
      this.newRoom.article = ''
      this.newRoom.question = ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user || ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
