<template>
  <v-container>
  	<v-layout row>
  	 <v-flex xs12 sm10 md10 offset-md-3 offset-sm1>
  	    <v-carousel v-if="get_loading" >
      		 <v-carousel-item v-for="item in items" v-bind:src="item.imageUrl" @click="chose_meetup(item.id)"></v-carousel-item>
      	</v-carousel>
    	  <v-flex offset-md5 class="mt-5">
    	       <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="purple" v-if="
    	       !get_loading"></v-progress-circular>
    	  </v-flex>
    	</v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import store from "./store.js"

export default{

	computed:{
		items() {
			return this.$store.getters.get_items
		},
		get_loading() {
			return this.$store.getters.get_loading
		}
	},
  
  methods:{
    	chose_meetup(id){
    		this.$router.push("/meet/"+id)
    	}
  }
}
</script>
<style>
</style>
