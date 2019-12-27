<template>
  <div class="chatroom">
    <chat-list :roomtitle="roomtitle" />
  </div>
</template>

<script>
import ChatList from './ChatList'


export default {
  name: 'ChatRoom',
  props: {
    roomtitle: {
      type: String
    }
  },
  components: {
    ChatList
  },
  data() {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
