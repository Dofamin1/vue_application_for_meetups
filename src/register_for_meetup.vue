<template>
   <v-layout row justify-center>
    <v-dialog v-model="dialog5" persistent max-width="290">
      <v-card class="white">
        <v-card-title class="headline white" >Register for meetup</v-card-title>
        <v-card-text class="white">Do you want to register for current meetup?You also register for notifications</v-card-text>
        <v-card-actions class="white">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog5 = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="register_for_meetup_func(keyy,user)">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script type="text/javascript">
import store from "./store.js"
	export default{
    props:['dialog5','keyy',"user"],
		  data () {
      return {
       
      }
    },
    methods:{
    register_for_meetup_func(key,user){
        console.log(key)
        this.$store.dispatch("register_for_meetup_act",[key,user])
        
    } 
  }
	}
</script>
<style type="text/css">
	
</style>