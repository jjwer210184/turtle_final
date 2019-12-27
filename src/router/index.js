import Vue from 'vue'
import Router from 'vue-router'
import ChatRoom from "@/components/ChatRoom";
import Home from "@/components/Home";

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      meta: {index: 0},
      component: Home
    },
    {
      name: 'chat',
      path: '/chat/:roomtitle',
      meta: {index: 1},
      props: true,
      component: ChatRoom
    }
  ]
})