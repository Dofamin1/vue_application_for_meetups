import vueRouter from 'vue-router'
import store from "./store.js"
//var user = this.$store.getters.get_user
export default (to,from,next)=>{
  if(store.getters.get_user){
    next()
  }
  if(store.getters.get_user==null){
    next("/signin")
  }
}
