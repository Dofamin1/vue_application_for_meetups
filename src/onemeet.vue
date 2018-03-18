<template>
	<div>
		<br>
		
		<v-container>
			<v-layout row>
				<v-flex offset-sm offset-md>
					<v-flex class="indigo">
						<v-layout row justify-center class="white">
						    <v-dialog v-model="switchEdit" persistent max-width="500px" height="300px" >
						      <v-card>
						        <v-card-title  class="white">
						          <span class="headline indigo--text">Edit meetup</span>
						        </v-card-title>
						        <v-card-text class="white">
						          <v-container grid-list-md  >
						            <v-layout wrap >
						              <v-flex xs12>
						                <v-text-field label="Title" required v-model="meetup.title" class="indigo--text"></v-text-field>
						              </v-flex>
						              <v-flex xs12>
						                <v-text-field label="Description" required v-model="meetup.desk" class="indigo--text"></v-text-field>
						              </v-flex>
						          
						              <v-flex xs12 sm6>
						              </v-flex>
						            </v-layout>
						          </v-container>
						        </v-card-text>
						        <v-card-actions class="white">
						          <v-spacer></v-spacer>
						          <v-btn color="indigo" flat @click.native="switchEdit = false">Close</v-btn>
						          <v-btn color="indigo" flat @click.native="save_changes(meetup)">Save</v-btn>
						        </v-card-actions>
						      </v-card>
						  </v-dialog>
						 </v-layout>
						 <v-layout row justify-center class="white">
						    <v-dialog v-model="switchEditTime" class="white" persistent max-width="580px" height="300px" >
						      <v-card class="white">
						        <v-card-title  class="white">
						          <span class="headline indigo--text">Edit meetup</span>
						        </v-card-title>
						        	<v-layout row>
								      <v-date-picker color="indigo" v-model="date_picker"></v-date-picker>
								    
							     	 	<v-time-picker color="indigo" v-model="time_picker"></v-time-picker>
							    	 </v-layout>
									
						        <v-card-actions class="white">
						          <v-spacer></v-spacer>
						          	<v-btn color="indigo" flat @click.native="switchEditTime = false">Close</v-btn>
						         	 <v-btn color="indigo" flat @click.native="save_time(meetup, date_picker, time_picker)">Save</v-btn>
						        </v-card-actions>
						      </v-card>
						  </v-dialog>
					 </v-layout>
					</v-flex>
				</v-flex>
			</v-layout>	     
		</v-container>



	<v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media v-bind:src="meetup.imageUrl" height="400px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <div><span class="text">Location:</span>{{ meetup.title }}</div>
            <div><span class="text">Time:</span>{{ meetup.date }}</div>
            <div><span class="text">Deskription:</span>{{ meetup.desk }}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" v-if="edit_valid" @click="switchEdit =! switchEdit">Edit</v-btn>
          <v-btn flat color="orange" v-if="edit_valid" @click="switchEditTime =! switchEditTime">Edit time</v-btn>
          <v-btn flat color="orange" v-if="!register_valid" @click="switchRegister =! switchRegister">Register</v-btn>
          <v-btn flat color="orange" v-if="register_valid" @click="switchUnRegister =! switchUnRegister">Unregister</v-btn>

        </v-card-actions>
      </v-card>
      <br>
      <br>
    </v-flex>
  </v-layout>
	<!-- register -->
	<template>
   <v-layout row justify-center>
    <v-dialog v-model="switchRegister" persistent max-width="290">
      <v-card class="white">
        <v-card-title class="headline orange" >Register for meetup</v-card-title>
        <v-card-text class="white">Do you want to register for current meetup?You also register for notifications</v-card-text>
        <v-card-actions class="white">
          <v-spacer></v-spacer>
          <v-btn color="orange" flat @click.native="switchRegister = false">Disagree</v-btn>
          <v-btn color="orange" flat @click.native="register_for_meetup_func(meetup.id,get__user.id)">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<!-- register -->
<template>
   <v-layout row justify-center>
    <v-dialog v-model="switchUnRegister" persistent max-width="290">
      <v-card class="white">
        <v-card-title class="headline orange">Unregister for meetup</v-card-title>
        <v-card-text class="white">Do you want to unregister for current meetup?</v-card-text>
        <v-card-actions class="white">
          <v-spacer></v-spacer>
          <v-btn color="orange" flat @click.native="switchUnRegister = false">Disagree</v-btn>
          <v-btn color="orange" flat @click.native="unregister_for_meetup_func(meetup.id,get__user.id)">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
	</div>
</template>

<script type="text/javascript">
import store from "./store.js"
import vueRouter from 'vue-router'
import register_for_meetup from "./register_for_meetup"
import unregister_for_meetup from "./unregister_for_meetup"
	export default{
		components:{
		register_for_meetup,
		unregister_for_meetup
		},
		computed:{
			meetup(){
				return this.$store.getters.get_item(this.id)
			},
			get__user(){
			return this.$store.getters.get_user
			},
			register_for_meetup(){
				for(let i=0; i < this.meetup.register_user.length; i++){
					if(this.get__user.id.toString() === this.meetup.register_user[i]){
						return true
					}
				}
			},
			edit_valid(){
				if(this.get__user == null && get__user == undefined){
					return false
				}
				if(this.get__user.id === this.meetup.user_id){
					return true
				}

			},
			register_valid(){
				return this.register_for_meetup
				console.log(this.get__user.id.toString() in this.meetup.register_user)
				
			}
		},
		data(){
			return{
				id:this.$route.params.id,
				switchEdit:false,
				switchEditTime:false,
				switchRegister:false,
				switchUnRegister:false,
				date:"",
				desk:"",
				date_picker:"",
				time_picker:""
			}
		},
		methods:{
			save_changes(meetup) {
				this.switchEdit = false
				
				this.$store.dispatch("save_changes_act", meetup)
			},
			save_time(meetup, date_picker, time_picker) {
				this.switchEditTime = false
				meetup.date = this.date_picker.toString() + "/" + this.time_picker.toString()
				this.$store.dispatch("save_time_act", meetup)
			},
			register_for_meetup_func(key, user) {
		        console.log(key)
		        this.$store.dispatch("register_for_meetup_act",[key,user])
		        this.switchRegister = !this.switchRegister
	    	},
	    	unregister_for_meetup_func(key, user) {
		        console.log(key)
		        this.$store.dispatch("unregister_for_meetup_act", [key,user])
		        this.switchUnRegister = !this.switchUnRegister
		    } 

			},
			created(){
				console.log(this.$router.props.id)
			}

	}
</script>
<style type="text/css" >
#meetup{
	width: 60%;
	height: 300px;
	background-repeat: no-repeat;
	background-position: 100% 100%;
}
#img{
	display: block;
	width: 80%;
	height: 500px;
	margin: 0 auto;
}
.desk{
	display: block;
	width: 80%;
	text-align: center;
	margin: 0 auto;
}
.center{
	display: block;
	width: 80%;
	margin: 0 auto;
}
#text_field{
	max-width: 100px;
}
.text{
	display: inline-block;
	margin-bottom: 9px;
	margin-right: 5px;
	color: #f27c07;
	font-size: 1.4em;
}
</style>