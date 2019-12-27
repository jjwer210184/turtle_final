<template>
  <div>
    <h5>{{roomtitle}}</h5>
    <b-button variant="success" size="sm" v-b-modal.questionModal>點我看問題</b-button>
    <b-button v-show="isEnd" variant="success" size="sm" class="ml-3" v-b-modal.articleModal>點我看答案</b-button>
    <b-button v-show="isEnd" variant="success" size="sm" class="ml-3" v-b-modal.chartModal>我的表現</b-button>
    <b-button v-show="isEnd" variant="success" size="sm" class="ml-3" v-b-modal.usersModal>大家的表現</b-button>
    <div class="chat-list mt-3">
      <b-container>

        <b-row v-for="(doc,index) in documents" :key="index" class="mb-2">
          <b-col>
            <message :message="doc" :permission="isHost" :roomtitle="roomtitle" />
          </b-col>
        </b-row>
      </b-container>
      <!-- quwstion modal -->
      <b-modal id="questionModal" title="Question" hide-footer>
        <p class="my-4">{{ detail.question }}</p>
      </b-modal>
      <!-- article modal -->
      <b-modal id="articleModal" title="Answer" hide-footer>
        <p class="my-4">{{ detail.article }}</p>
      </b-modal>
      <!-- chart modal -->
      <b-modal id="chartModal" title="你的表現" hide-footer>
        <div class="d-flex justify-content-between">
          <div>
            <img width="100" src="https://image.flaticon.com/icons/png/512/25/25404.png">
            <p class="my-4" style="font-size: 14px;">你的問題正確率: {{ userPerformance.correctRate }}%</p>
          </div>
          <div>
            <img width="100" src="https://image.flaticon.com/icons/png/512/17/17124.png">
            <p class="my-4" style="font-size: 14px;">你的問題錯誤率: {{ userPerformance.wrongRate }}%</p>
          </div>
          <div>
            <img width="100" src="https://image.flaticon.com/icons/png/512/1698/1698558.png">
            <p class="my-4" style="font-size: 14px;">廢話率: {{ userPerformance.shitRate }}%</p>
          </div>
        </div>
        <p v-if="userPerformance.bingo" class="my-4">恭喜你成功解題～～～</p>
      </b-modal>
      <!-- users modal -->
      <b-modal id="usersModal" title="大家的表現" hide-footer body-class="p-0 m-0">
        <b-carousel

        id="carousel-users"
        :interval="4000"
        controls
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
      >
        <!-- Text slides with image -->
        <b-carousel-slide

          caption="海龜王"
          img-src="http://tomchun.tw/tomchun/wp-content/uploads/2018/06/2492507.jpg"
        >{{turtleKing}}</b-carousel-slide>

        <b-carousel-slide
          caption="答題王"
          img-src="https://cdn.hk01.com/di/media/images/3338108/org/3710f606b2dc69eb98fab09f3369741c.jpg/gwiJ1M2VuZ8-SgKdlcZe4UFqF1npr8tPhedVCIXnVQg?v=w1920r16_9"
        >{{usersPerformance.correctKing.toString()}}</b-carousel-slide>
        <b-carousel-slide
          caption="答錯王"
          img-src="https://d32kak7w9u5ewj.cloudfront.net/media/image/2018/11/2e6888eb9fb4481d936af71854b55f66.jpg"
        >{{usersPerformance.wrongKing.toString()}}</b-carousel-slide>
        <b-carousel-slide
          caption="幹話王"
          img-src="https://d32kak7w9u5ewj.cloudfront.net/media/image/2018/11/2e6888eb9fb4481d936af71854b55f66.jpg"
        >{{usersPerformance.shitKing.toString()}}</b-carousel-slide>
        </b-carousel>
      </b-modal>
    </div>
    <chat-input class="message-input" :roomtitle="roomtitle"/>
  </div>
</template>

<script>
import { db } from '../db.js'
import Message from './Message'
import ChatInput from './ChatInput'

export default {
  name: 'ChatList',
  props: {
    roomtitle: {
      type: String
    }
  },
  components: {
    Message,
    ChatInput
  },
  data() {
    return {
      documents: [],
      detail: [],
    }
  },
  firestore() {
    return {
      documents: db.collection(this.roomtitle).orderBy("time", "asc"),
      detail: db.collection(this.roomtitle).doc('initial'),
    }
  },
  methods: {
    findModes(messages) {
      let frequency = {}; 
      let maxFreq = 0; 
      let modes = [];

      messages.forEach(msg => {
        frequency[msg.username] = (Number([frequency[msg.username]]) || 0) + 1
        if(frequency[msg.username] > maxFreq) {
          maxFreq = frequency[msg.username]
        }
      })

      for(let name in frequency){ 
        if (frequency[name] === maxFreq) {
          modes.push(name)
        }
      }
      return modes
    }
  },
  watch: {
    isEnd(val) {
      if(val) {
        this.$bvModal.show('articleModal')
      }
    },
    documents(val) {
      val.forEach(doc => {
        doc['idcode'] = doc.id
      })
    }
  },
  computed: {
    turtleKing() {
      if(this.documents.length < 2) {
        return ''
      }
      return this.documents.filter(doc => doc.answer === 4)[0]['username']
    },
    isEnd() {
      return Boolean(undefined !== this.documents.find(doc => doc.answer === 4))
    },
    isHost() {
      return Boolean(this.detail.userId === this.$store.state.user.data.uid)
    },
    userPerformance() {
      let userMessage =  this.documents.filter(doc => doc.userId === this.detail.userId)
      let correctRate = Math.round(userMessage.filter(msg => msg.answer === 1).length / userMessage.length * 100)
      let wrongRate = Math.round(userMessage.filter(msg => msg.answer === 2).length / userMessage.length * 100)
      let shitRate = Math.round(userMessage.filter(msg => msg.answer === 3).length / userMessage.length * 100)
      let bingo = Math.round(userMessage.filter(msg => msg.answer === 4).length)

      return {
        correctRate,
        wrongRate,
        shitRate,
        bingo
      }
    },
    usersPerformance() {
      let rightMessages =  this.documents.filter(doc => doc.answer === 1)
      let wrongMessages =  this.documents.filter(doc => doc.answer === 2)
      let shitMessages =  this.documents.filter(doc => doc.answer === 3)

      let correctKing = this.findModes(rightMessages)
      let wrongKing = this.findModes(wrongMessages)
      let shitKing = this.findModes(shitMessages)

      return {
        correctKing,
        wrongKing,
        shitKing
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-list {
  height: 50vh;
  overflow-y: auto;
}
.message-input {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
