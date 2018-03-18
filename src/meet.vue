<template>
	<div id="wrapper">
		<form v-for="item in items" id="wrapper_picture">
			<router-link v-bind:to="'meet/'+item.id">
				<img v-bind:src="item.imageUrl" id="picturee">
			</router-link>
				<div id="wrapper_for_text">
					<div id="text_jf_meet"><span id="Location">Location:</span>{{ item.title }}</div>
					<div id="text_jf_meet"><span id="Location">Date:</span>{{ item.date }}</div>
				</div>
				<hr>
				<span><span id="Location">Description:</span>{{ item.desk }}</span>
				
		</form>
			<router-link to="/newmeetup" class="no_dec">
				<div id="but_for_meetup">Add new meetup</div>
			</router-link>
	</div>
</template>
<script type="text/javascript">
import store from "./store.js"
	export default{
		computed:{
			items() {
				return this.$store.getters.get_items
				}
			},
			data:function() {
				return {
					id:this.$route.params.id
			}
		}
	}
</script>
<style>
*{
	padding: 0px;
	margin: 0px;
}
#wrapper_picture{
	width: 50%;
	margin: 0 auto;
	height: 440px;
	margin: 0 auto;
	background-color: #3d3836;
	margin-bottom: 40px

}
hr{
	display: block;
	width: 90%;
	margin: 0 auto;
	height: 1px;
}
#picturee{
	width: 100%;
	height: 300px;
	cursor: pointer;
}
span{
	display: block;
	margin-top: 8px;
	padding: 10px;
	color:white;
	font-size: 1.2em;
}
#but_for_meetup{
	width: 30%;
	height: 40px;
	margin:  0 auto;
	margin-top: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 1.4em;
	background-color: #728096;
	color: #fff;
	text-decoration: none !important;
}
#Location{
	color: #ff7d05;
	display: inline;
	font-size: 1.12em;
}
#but_for_meetup:hover{
	background-color: #314a72;
	cursor: pointer;
}
#wrapper_for_text{
	margin-top: 0px;
	width: 100%;
}
#text_jf_meet{
	display: inline-block;
	text-align: center;
	font-size: 1.3em;
	width: 49%;
	color: #3d3836;
	color: white;
	font-weight: 200;

}

#wrapper_content{
	width: 70%;
	height: 400px;
	margin: 0 auto;
	margin-top: 100px;
}
.no_dec{
	text-decoration: none;
}
.no_dec:active{
	text-decoration: none;
	color: #728096;
}
</style>
