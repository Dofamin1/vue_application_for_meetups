<template>
  <div id="app">
    <div id="header">
      <div class="menu_item log"  v-if="switcher" >
        <router-link to="/signin" class="no_dec" tag="div">Log In</router-link>
      </div>
      <div class="menu_item log" v-if="!switcher" @click="sign_out">
        <router-link to="/" class="no_dec" tag="div" >Log out</router-link>
      </div>
      <div id="main_menu">
        <div class="menu_item">
          <router-link to="/" class="no_dec" tag="div">Main</router-link>
        </div>
        <div class="menu_item">
          <router-link to="/list" class="no_dec" tag="div">list</router-link>
        </div>
         <div class="menu_item" v-if="switcher">
          <router-link to="/register" class="no_dec" tag="div"><v-icon >fingerprint</v-icon>register</router-link>
        </div>
        <div class="menu_item" v-if="!switcher">
          <router-link to="/newmeetup" class="no_dec" tag="div">Create new meet</router-link>
        </div>

      </div>

    </div>
    <br>
   <router-view></router-view>
  </div>
</template>

<script>
import meet from "./meet.vue"
export default {
  name: 'app',
  components:{
    meet
  },
  computed:{
    switcher(){
      return this.$store.state.switcher
    }
  },
  data () {
    return {

    }
  },
  methods:{
    sign_out(){
      this.$store.dispatch("sign_out_act")
    }
  }
}
</script>

<style>

.logo{
  float: left;
  width: 40px;
}
#wrapper{
  width: 100%
}
#header{
  width: 100%;
  height: 60px;
  background-color: #050402;
  opacity: 0.85;
}

#main_menu{
  float: right;
  width: 74%
}
.menu_item{
  width: 24%;
  height: 40px;
  text-align: center;
  line-height: 55px;
  display: inline-block;
  font-size: 1.4em;
  font-weight: bold;
  color: #ff9a02;
}
.text{
  display: inline-block;
  margin-left: 5px;
}
.menu_item:hover{
  width: 24%;
  height: 60px;
  text-align: center;
  line-height: 55px;
  display: inline-block;
  font-size: 1.4em;
  font-weight: bold;
  color: black;
  background-color: #ff790c;
  cursor: pointer;
}
.no_dec{
  text-decoration: none;
}
.no_dec:active{
  text-decoration: none;
  color: #728096;
}
</style>
