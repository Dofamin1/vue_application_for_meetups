import Vue from 'vue'
import App from './App.vue'
import meet from './meet.vue'
import onemeet from './onemeet.vue'
import newmeetup from './newmeetup.vue'
import main from './main.vue'
import register from './Users/register.vue'
import signin1 from './Users/signin.vue'
import register_for_meetup from './register_for_meetup.vue'
import VueResource from 'vue-resource'
import "./firebase.js"
import VueFire from 'vuefire'
import store from "./store.js"
import vueRouter from 'vue-router'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'
import router_bloker from './router_bloker.js'
// main.styl


Vue.use(Vuetify)
Vue.use(VueFire)
Vue.use(vueRouter)


const router = new vueRouter({
	routes:[{path:"/",component:main},
	{path:"/list",component:meet},
	{path:"/meet/:id",component:onemeet},
	{path:"/newmeetup",component:newmeetup,beforeEnter:router_bloker},
	{path:"/register",component:register},
	{path:"/signin",component:signin1},

	]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  created(){
  	this.$store.dispatch("database_update")
		this.$store.dispatch("auto_signin")
  }
})
