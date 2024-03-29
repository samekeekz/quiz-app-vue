import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import QuestionPage from '@/pages/QuestionPage.vue'


const routes = [
  {
    name: 'Home' ,path: '/', component: HomePage, props: true
  },
  {
    name: 'QuestionPage' ,path: '/:subject', component: QuestionPage, props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;