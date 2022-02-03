/* Ethan Timothy | Vue Form Demo | 1/29/22 */

const formcomponent = {

	data() {

		return {

			userData: {
				name: null,
				email: null,
				password: null,
				password2: null,
				occupation: null,
				state: null,

				json: null,
				errors: [],
				occupations: [],
				states: [],
				states_fullName: [],
				is_submitted: false,
				show_pass: false,
				pass_match: false
			}
		}
	},

	methods: {

		//Method prevents user from submitting for with missing fields
		checkform() {

			this.check_passwords();

			if(this.userData.name && this.userData.email && this.userData.password && this.userData.password2 && this.userData.occupation && this.userData.state && this.userData.pass_match){
				this.userData.errors = []; //clears errors off screen
				this.sumbitted_msg();
			}

			this.userData.errors = [];

			if(!this.userData.name){
				this.userData.errors.push("Full Name is Required")
			}

			if(!this.userData.email){
				this.userData.errors.push("Email is Required")
			}

			if(!this.userData.password){
				this.userData.errors.push("Password is Required")
			}

			if(!this.userData.password2){
				this.userData.errors.push("Password Confirmation is Required")
			}

			if(!this.userData.occupation){
				this.userData.errors.push("Occupation is Required")
			}

			if(!this.userData.state){
				this.userData.errors.push("State is Required")
			}

			if(!this.userData.pass_match){
				this.userData.errors.push("Passwords do not match")
			}
		},

		//Method for importing form_data.json and parsing the data into the corresponding lists
		get_JSONdata() {
			fetch("form_data.json")
			.then(response => {

				return response.json();
			})
			.then(jsondata => {

				console.log("JSON DATA FETCHED: "),
				console.log(jsondata), //shows successful get request in dev console

				this.userData.json = jsondata,
				this.userData.occupations = jsondata.occupations,
				this.userData.states = jsondata.states;
				
				//Pulling full state names from JSON
				for (let i = 0; i < 51; i++){
					this.userData.states_fullName.push(jsondata.states[i]['name'])
				}
				
			})
			.catch((error) => {
				console.log(error)
			});
		},
		
		//Method to compare if passwords match or not
		check_passwords() {
			if(this.userData.password == this.userData.password2) {
				this.userData.pass_match = true;
			}
			else {
				this.userData.pass_match = false;
			}
		},

		/* Method is called in checkform() if all form fields are filled out. Once changed to true 
		the form items are no longer rendered and are replaced with the <h1> in line 46 of index.html */
		sumbitted_msg() {
			this.userData.is_submitted = true;
		}
	},

	// Makes GET request on render to populate state and occupation drop downs
	mounted(){
		this.get_JSONdata();
	}
}

const myform = Vue.createApp(formcomponent).mount('#myform')