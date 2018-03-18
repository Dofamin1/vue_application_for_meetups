import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import axios from 'axios'
import * as firebase from 'firebase'
Vue.use(Vuex)
Vue.use(VueResource)

const store = new Vuex.Store({
 	state:{
 		items:[
			
			  ],
		user:null,
		switcher:true,
		error_reg:"",
		error_sign:"",
		loading:false,
		
 	},
 	getters:{
 		get_items(state) {
 			return state.items
 		},
 		get_item(state) {
 			return (idd) => {
 			return state.items.find((item) => {
 				return item.id == idd
 			})
 		}
 		},
 		get_user(state) {
 			return state.user
 		},
 		get_error_reg(state) {
 			return state.error_reg
 		},
 		get_error_sign(state) {
 			return state.error_sign
 		},
 		get_loading(state) {
 			return state.loading
 		},
 		
 	},
 	mutations:{
 		add_new_meetup(state, pilot) {
 			state.items.push({...pilot,
 				register_user:pilot.register_user})
 		},
 		users_mut(state, pilot) {
 			state.user = new Object
 			state.user.id = pilot.id;
 			state.user.register_meetups = []
 			state.switcher=false
 		},
 		set_error(state, pilot) {
 			state.error_sign = pilot
 		},
 		set_error_reg(state, pilot) {
 			state.error_reg = pilot
 		},
 		set_loading(state, pilot) {
 			state.loading = pilot
 		},
 		signout_mut(state) {
 			state.user=null
 			state.switcher = true
 		},
 		save_changes_mut(state, pilot) {
 		const new_item = state.items.find( item => {
 				return item.id === pilot.id
 			})
 		new_item.title = pilot.title
 		new_item.desk = pilot.desk
 		
 		},
 		save_time_mut(state, pilot) {
 			const new_item = state.items.find( item => {
 				return item.id === pilot.id
 			})
 			new_item.date = pilot.date
 		},
 		register_for_meetup_mut(state, pilot){
 			
 			const neew_item =  state.items.find((item) => {
 				return item.id == pilot[0]
 			})
 			neew_item.register_user.push(pilot[1])
 		},
 		unregister_for_meetup_mut(state, pilot) {
 			
 			const neeew_item =  state.items.find((item) => {
 				return item.id == pilot[0]
 			})
 			let deleted_elment = neeew_item.register_user.findIndex (element=> {
 					return element === pilot[1]
 				})
 			neeew_item.register_user.splice(deleted_elment, 1)
 		}
 		
 		

 	},
 	actions:{
 		add_new_meetup_act({commit, getters}, pilot){
 			let imageUrl
 			let key
 			firebase.database().ref("meetings").push({...pilot,user_id:getters.get_user.id}).then( data => {
 				console.log(data)
 				key = data.key
 				return key
 			}).then(key => {
   				const filename = pilot.picture.name
   				const ext = filename.slice(filename.lastIndexOf("."))
   				return firebase.storage().ref("meetups/" + key + "." + ext).put(pilot.picture)
 			}).then( fileData => {
   				imageUrl = fileData.metadata.downloadURLs[0]
   				return firebase.database().ref("meetings").child(key).update({imageUrl: imageUrl})
 			}).then(()=>{
   				commit("add_new_meetup", {
   					...pilot,
   					id:key,
   					imageUrl:imageUrl,
            user_id:getters.get_user.id,
            register_user:["1"]
   			}
 			)
 			}).catch( error=>{
 				console.log(error)
 			})
 		},
 		save_changes_act({commit}, pilot) {
 			const new_obj = {}
 			new_obj.desk = pilot.desk
 			new_obj.title = pilot.title
 			firebase.database().ref("meetings").child(pilot.id).update(new_obj)
 			commit("save_changes_mut", pilot)
 		},
 		save_time_act({commit}, pilot) {
 			const new_obj = {}
 			new_obj.date = pilot.date
 			firebase.database().ref("meetings").child(pilot.id).update(new_obj)
 			commit("save_time_mut",pilot)
 		},
 		database_update({commit,getters}) {
 			commit("set_loading", false)
 			firebase.database().ref("meetings").once("value").then( data=> {
 				const val = data.val();
 				const arr_meet=[];
 				commit("set_loading", true)
 				for(let key in val){
 					commit("add_new_meetup", {
 						id:key,
 						title:val[key].title,
 						date:val[key].date,
 						imageUrl:val[key].imageUrl,
 						desk:val[key].desk,
 						user_id: getters.get_user.id,
 						register_user:val[key].register_user
 					
 				})
 					
 				

 		}
 	})},
 		register_for_meetup_act({commit}, pilot){
 			commit("register_for_meetup_mut",pilot)
 			
 			firebase.database().ref("meetings").child(pilot[0]).once("value").then( data=> {
 				return data.val().register_user
 				console.log(data.val())
 			}).then( passed_data => {
 				passed_data.push(pilot[1])
 				const new_obj = {}
 				new_obj.register_user = passed_data
 				firebase.database().ref("meetings").child(pilot[0]).update(new_obj)
 			}
 			)
 		},
 		unregister_for_meetup_act({commit}, pilot){
 			commit("unregister_for_meetup_mut",pilot)
 			firebase.database().ref("meetings").child(pilot[0]).once("value").then(data=>{
 				return data.val().register_user
 			}).then(passed_data => {
   				 let deleted_elment = passed_data.findIndex( element => {
   				return element === pilot[1]
 				})
 				passed_data.splice(deleted_elment, 1)
 				const new_obj={}
 				new_obj.register_user = passed_data
 				firebase.database().ref("meetings").child(pilot[0]).update(new_obj)
 			})


 		},
 		register_user({commit},pilot){
 			commit("set_loading",false)
 			firebase.auth().createUserWithEmailAndPassword(pilot.email,pilot.password).then(
 				user=>{
 					const new_user={
 						id: user.uid,
 						register_meetups: []

  					}
  					commit("users_mut",new_user)
  					commit("set_loading",true)
 				}).catch( error =>{
 					commit("set_error_reg", error.message)
 					console.log(error)
 					commit("set_loading",true)
 				}
 				)

 		},
 		sign_in_user({commit},pilot){
 			commit("set_loading",false)
 			firebase.auth().signInWithEmailAndPassword(pilot.email,pilot.password).then(
 				user=>{
 					const new_user={
   						id: user.uid,
   						register_meetups: []
            }
  					commit("users_mut",new_user)
            commit("set_loading",true)
 				}).catch(
   					error =>{
   					commit("set_error", error.message)
   					console.log(error)
          }
 				)

 		},
 		sign_out_act({commit}){
 			commit("signout_mut")
      firebase.auth().signOut();
 		},
    auto_signin({commit}){
     
      firebase.auth().onAuthStateChanged((user) =>{
      	
      commit("users_mut",{
          id:user.uid,
          register_meetups:[]
        })
      console.log("efefefef")
      })

      
    }
  }
 })
export default store;
