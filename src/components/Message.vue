<template>
  <div size="sm" class="message" :class="[isUser ? 'float-right': 'float-left']">
    <div>
      <div class="text-left text-success" v-if="!isUser">{{ message.username }}:</div>
      <div class="text-left">
        {{ message.message }}
        <span class="px-3 text-secondary" style="font-size: 12px;">{{formateTime}}</span>
      </div>
      <div v-if="message.answer" style="font-size: 10px;" class="text-secondary text-left">答案:{{ answerMessage }}</div>
      <div v-if="permission">
        <b-form-group>
          <b-form-radio size="sm" class="text-info d-inline-block mr-2" v-model="answer" :value="1">是</b-form-radio>
          <b-form-radio size="sm" class="text-info d-inline-block mr-2" v-model="answer" :value="2">不是</b-form-radio>
          <b-form-radio size="sm" class="text-info d-inline-block mr-2" v-model="answer" :value="3">不重要</b-form-radio>
          <b-form-radio size="sm" class="text-info d-inline-block" v-model="answer" :value="4">答對啦!破關啦!</b-form-radio>
          <b-button @click="updateAnswer" size="sm" class="ml-2">enter</b-button>
        </b-form-group>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../db.js'

export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      default() {
        return {}
      }
    },
    permission: {
      type: Boolean
    },
    roomtitle: {
      type: String
    }

  },
  data(){
    return {
      answer: this.message.answer
    }
  },
  methods: {
    updateAnswer() {
      db.collection(this.roomtitle).doc(this.message.idcode).update({
        answer: this.answer
      })
    }
  },
  computed: {
    formateTime() {
      const hr = new Date(this.message.time.seconds * 1000).toTimeString().split(":")[0]
      const min = new Date(this.message.time.seconds * 1000).toTimeString().split(":")[1]
      return hr + ':' + min
    },
    isUser() {
      if (this.message.userId === this.$store.state.user.data.uid) {
        return true
      }
      return false
    },
    answerMessage() {
      if(this.message.answer === 1) {
        return '是'
      }
      else if (this.message.answer === 2) {
        return '不是'
      }
      else if (this.message.answer === 3) {
        return '不重要'
      }
      else if (this.message.answer === 4) {
        return '是，這是一個正解'
      }
      return ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message {
  font-size: 14px;
}
</style>