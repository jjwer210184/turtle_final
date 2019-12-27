<template>
  <div class="chatinput">
    <b-container>
      <b-row class="py-3">
        <b-col cols="10">
          <b-form-input v-model="text" placeholder=""></b-form-input>
        </b-col>
        <b-col cols="2">
          <b-button class="w-100" variant="success" @click="sendMessage">Send</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { db } from '../db.js'

export default {
  name: 'ChatInput',
  props: {
    roomtitle: {
      type: String
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
  sendMessage() {
    db.collection(this.roomtitle).doc().set({
      message: this.text,
      userId: this.$store.state.user.data.uid,
      username: this.$store.state.user.data.displayName,
      answer: null,
      time: new Date()
    })
    this.text = ''
  }
  }
}
</script>

<style scoped>
</style>
