<template>
	<div id="wrapper_register">
	<v-conteiner>
		<v-layout row>
			<v-flex md8 sm8 xs8 offset-md2 offset-sm2 >
				<v-alert color="red" icon="info" v-model="alert">
		      			{{ get_error }}
		   		</v-alert>
			<v-form v-model="valid">
			    <v-text-field
			      label="Email"
			      v-model="email"
			      :rules="nameRules"
			      :counter="10"
			      color="indigo"
			      required
			    ></v-text-field>
			    <v-text-field
			      label="Password"
			      v-model="password"
			      :rules="emailRules"
			      color="indigo"
			      required
			      type="password"
			    ></v-text-field>
			    <v-text-field
			      label="Confirm password"
			      v-model="conf_password"
			      :rules="emailRules"
			      color="indigo"
			      required
			      type="password"
			    ></v-text-field>
			    <v-flex offset-sm4 offset-md2><v-btn @click="Register_func" class="indigo--text" :disabled="!formValid"
			    	:loading="!get_loading">Register</v-btn>
			    </v-flex>
		  </v-form>
		</v-flex>
	</v-layout>
</v-conteiner>
</div>
</template>
<script type="text/javascript">
import * as firebase from 'firebase'
import store from "../store.js"
export default{
	computed:{
		formValid() { 
			return this.password !== "" && this.email !=="" && this.password == this.conf_password
		},
		get_user() {
			return this.$store.getters.get_user
		},
		get_error(){
			return  this.$store.getters.get_error_reg
		},
		get_loading() {
			return this.$store.getters.get_loading
		}
	},
	data() {
		return{
			password: "",
			email: "",
			conf_password: "",
			alert: false
		}
	},
	methods: {
		Register_func(){
			this.$store.dispatch("register_user", {password: this.password, email: this.email})
		}
	},
	watch: {
		get_user(value) {
			if (value !== null && value !== undefined) {
				this.$router.push("/")
			}
		},
		get_error(value){
			if(value !== "") {
				this.alert = true
			}
			if(value == ""){
				this.alert = false
			}
		}
	}
}
</script>
<style type="text/css">
	#wrapper_register{
		background-image: url('http://on-desktop.com/wps/Backgrounds_Black_cubic_background_094966_.jpg');
	    background-repeat: repeat;
	}
</style>