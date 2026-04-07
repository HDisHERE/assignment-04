//This is the part I use copilot to create. Arouter list.
import { createRouter, createWebHistory } from 'vue-router'

// Import all the  component
import Home        from './components/Home.vue'
import Ancient     from './components/Pages/Acient.vue'
import Industrial  from './components/Pages/Industrial.vue'
import Renaissance from './components/Pages/Renaissance.vue'
import WorldWars   from './components/Pages/World-wars.vue'
import About       from './components/Pages/About.vue'
import Login       from './components/Pages/Login.vue'
import Review      from './components/Pages/Review.vue'

const routes = [
  { path: '/',            component: Home },
  { path: '/ancient',     component: Ancient },
  { path: '/industrial',  component: Industrial },
  { path: '/renaissance', component: Renaissance },
  { path: '/world-wars',  component: WorldWars },
  { path: '/about',        component: About },
  { path: '/login',        component: Login },
  { path: '/review',       component: Review },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})