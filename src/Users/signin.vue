<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm6 md6 offset-sm3 offset-md2>
				<h1 class="indigo--text">Sign in</h1>
			</v-flex>
		</v-layout>
		<br>
		<v-layout row>
			<v-flex md8 sm8 xs8 offset-md2 offset-sm2 >
				<v-alert color="red" icon="info"  v-model="alert">
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
				    <v-flex offset-sm4 offset-md2><v-btn @click="Sign_in_func" class="indigo--text" :disabled="!formValid"
				    	:loading="!get_loading">Sign In</v-btn>
				    </v-flex>
			  	</v-form>
			</v-flex>
		</v-layout>
  </v-container>
</template>
<script type="text/javascript">
import * as firebase from 'firebase'
import store from "../store.js"
export default{
	computed:{
		formValid() {
			return this.password !== "" && this.email !==""
		},
		get_user() {
			return this.$store.getters.get_user
		},
		get_error() {
			return this.$store.getters.get_error_sign
		},
		get_loading() {
			return this.$store.getters.get_loading
		}
	},
	data(){
		return {
			password: "",
			email: "",
			conf_password: "",
			alert: false
		}
	},
	methods:{
		Sign_in_func() {
			this.$store.dispatch("sign_in_user",{password:this.password, email: this.email})
		}
	},
	watch:{
		get_user(value) {
			if (value !== null && value !== undefined) {
				this.$router.push("/")
			}
		},
		get_error(value) {
			if(value !== "") {
				this.alert = true
			}
			if(value == "") {
				this.alert = false
			}
		},

	}
}
</script>
<style type="text/css">
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
	
</style>