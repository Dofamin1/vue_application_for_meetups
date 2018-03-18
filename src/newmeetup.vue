<template>
	<div>
		<v-container>
			<v-layout-form>
				<v-flex xs12 sm6 md6 offset-sm3 offset-md2>
					<h1 class="indigo--text">Create a new meetup!</h1>
				</v-flex>
				<br>
			<v-flex sx10 md8 sm8 offset-sm2 offset-md2 >
				<v-form v-model="valid" >
		    		<v-text-field label="title"
			    		class="indigo--text"
					    v-model="newmeetup.title"
						:rules="nameRules"
						:counter="10"
						required
					    ></v-text-field>
					    <v-text-field
					    class="indigo--text"
			      		label="description"
			      		v-model="newmeetup.desk"
					     :rules="nameRules"
					     :counter="10"
					     required>
				     </v-text-field>
					<img v-bind:src="picture" v-if="newmeetup.picture !== ''">
					<v-flex >
				    	<v-btn class="indigo" @click="image_picker" >pick an image</v-btn>
					</v-flex>
						<input type='file' style="display:none" ref="impick" @change="impick2">
				</v-form>
  			</v-flex>
  			<v-layout row wrap>
			    <v-flex md4 lg4 offset-md2>
			      <v-date-picker color="indigo" v-model="date"></v-date-picker>
			    </v-flex>
			    <v-flex md4 lg4 offset-md1>
		     	 	<v-time-picker color="indigo" v-model="time"></v-time-picker>
		    	</v-flex>
			</v-layout>
			<br>
  			<v-flex offset-sm4 offset-md2><v-btn @click="add_new_meetup_method(newmeetup)" class="indigo" :disabled="!formValid" large>Add</v-btn>
  			</v-flex>
  			<hr class="indigo" >
  		</v-layout-form>
	</v-container>
</div>
</template>
<script>

export default{
	computed:{
		formValid() {
			return this.newmeetup.title !== "" && this.newmeetup.picture !== "" && this.newmeetup.desk !== ""
		},
		get_item() {
			return this.$store.getters.get_items
		},
		get_user() {
			return this.$store.getters.get_user
		}
	},
	methods:{
		add_new_meetup_method(meetup) {
			this.newmeetup.date = this.date + "/" + this.time
			this.$store.dispatch("add_new_meetup_act", meetup)
			console.log(this.get_item)
			this.$router.push("/")
		},
		image_picker() {
			this.$refs.impick.click()
		},
		impick2(event) {
			const img = event.target.files
			console.log(event)
			var  img_name = img[0].name

			if(img_name.lastIndexOf(".")<=0){
				return alert("picked file is not valid")
			}

			const file_reader = new FileReader()
			file_reader.addEventListener('load', () => {
				this.picture = file_reader.result
			})
			file_reader.readAsDataURL(img[0])
			this.newmeetup.picture = img[0]
		}
	},
	data: function() {
			return{
				newmeetup:{
					title: "",
					date: "",
					desk: "",
					picture: "",
					register_user: ["1"]
				},
				picture: null,
				valid: false,
        		date: "",
				time: new Date(),
		        name: '',
		        nameRules: [
		          (v) => !!v || 'Name is required',
		          (v) => v.length <= 10 || 'Name must be less than 10 characters'
		        ],
		        email: '',
		        emailRules: [
		          (v) => !!v || 'E-mail is required',
		          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
		        ]
					}
				}

}
</script>
<style>
.input{
  display: block;
  width: 90%;
  height: 32px;
  border: none;
  border-bottom: 1px solid #CCCCCC;
  margin: 0 auto 10px;
}
#but_for_meetuup{
	display: block;
	width: 30%;
	height: 40px;
	margin:  0 auto;
	margin-top: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 1.4em;
	background-color: #728096;
	color: #fff;

}
#but_for_meetuup:hover{
	background-color: #314a72;
	cursor: pointer;
}
img{
	width: 40%;
	height: 200px;
}
#wrapper_for_img{
	width: 90%;
	margin: 0 auto;
}
hr{
	display: block;
	width: 67%;
	margin: 0 auto;
	height: 0.5px;
}
</style>
