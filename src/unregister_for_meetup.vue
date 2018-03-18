<template>
   <v-layout row justify-center>
    <v-dialog v-model="dialog6" persistent max-width="290">
      <v-card class="white">
        <v-card-title class="headline white" >Unregister for meetup</v-card-title>
        <v-card-text class="white">Do you want to unregister for current meetup?</v-card-text>
        <v-card-actions class="white">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog6 = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="register_for_meetup_func(keyy,user)">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script type="text/javascript">
import store from "./store.js"
	export default{
    props:['dialog6', 'keyy', "user"],
    methods:{
      register_for_meetup_func(key, user){
          console.log(key)
          this.$store.dispatch("unregister_for_meetup_act", [key,user])
          
      } 
    }
	}
</script>
<style type="text/css">
	
</style>