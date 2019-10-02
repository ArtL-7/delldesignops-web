Vue.component('card-component', {
	template: `
<el-card class="box-card">
	<el-row :gutter="20">
		<el-col :span="4" class="vote-column">
			<div class="vote-box">
				<p class="vote-number">{{ item['fields']['Vote count'] }}</p>
				<p class="vote-text">Votes</p>
			</div>
			<el-popover placement="right" width="500" v-model="visible">
				<p style="font-size:11px">Your Dell email, we'll use it to keep you updated
				</p>
				<div class="vote-align">
					<input type="text" v-model="Email" id="email" placeholder="Your Email" style="margin-right:8px">
					<el-button type="primary" size="mini" v-on:click="vote(item.id)">Submit your vote</el-button>
				</div>
				<el-alert v-bind:style='{"display": (InvalidEmailEntry? "block" :"none" ) }'
					title="Invalid Email! Your email has to be in the 'dell.com' domain" type="error" :closable="true"
					id="invalid-email-alert">
				</el-alert>
				<el-alert v-bind:style='{"display": (EmptyInputField? "block" :"none" ) }' title="Email field can't be empty"
					type="error" :closable="true" id="invalid-email-alert">
				</el-alert>
				<el-button slot="reference" type="primary" size="small" class="vote-button">Vote</el-button>
			</el-popover>

		</el-col>

		<el-col :span="20">
			<div>
				<h3>{{ item['fields']['Idea'] }}</h3>
				<p>{{ item['fields']['Description'] }}</p>
				<div>
					<span>By: {{ item['fields']['Author'] }} </span>
					<el-divider direction="vertical"></el-divider>
					<span class="chip-category">Category: {{ item.fields.CategoryStr }}</span>
					<el-divider direction="vertical"></el-divider>
					<span class="chip-category">{{ item['fields']['Status'] }}</span>
				</div>

			</div>
		</el-col>

	</el-row>
</el-card>
`,
	data() {
		return {
			visible: false,
			InvalidEmailEntry: false,
			EmptyInputField: false
		};

	},
	props: {
		item: Object,
		Email: "",
	},
	methods: {
		vote: function (index) {
			// Init variables
			var self = this;
			var app_id = "appqkCHQ4G7q4mh7M";
			var app_key = "keyhHv75E3RaOkVX4";
			var email = this.Email;

			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (this.Email == undefined && !(this.EmptyInputField)) {
				this.EmptyInputField = true;
			} else {
				this.EmptyInputField = false;
				if (re.test(email)) {
					if (email.indexOf("@dell.com", email.length - "@dell.com".length) !== -1) {
						// This is how you post to a table in airtable
						// POST the data
						this.InvalidEmailEntry = false;
						axios
							.post(
								"https://api.airtable.com/v0/" + app_id + "/Votes?view=Grid%20view", {
								fields: {
									Email: this.Email,
									ForIdea: [index] //index = Record id = template ID

									// Name: this.name,

								}
							}, {
								headers: {
									Authorization: "Bearer " + app_key
								}
							}
							)
							.then(function (response) {
								console.log(response);
							})
							.catch(function (error) {
								console.log(error);
							});
						this.Email = "";
						this.visible = false;
						// refresh page this.loadItems(); 
						document.location.reload(true);
					} else {
						this.InvalidEmailEntry = true;
					}
				} else {
					this.InvalidEmailEntry = true;
				}
			}
		}




	} //end methods

}); // End template

var app = new Vue({
	el: '#app',
	data: {
		items: [],
		categories: [],
		ideaFilterKey: 'all',
		dialogTableVisible: false,
		dialogFormVisible: false,
		form: {
			name: '',
			description: '',


			type: [],
			resource: '',
			desc: ''
		},
		formLabelWidth: '120px'



	},
	computed: {
		ideaFilter() {
			return this[this.ideaFilterKey];
		},
		all() {
			return this.items;
		},
		DellDigitalDesign() {
			return this.items.filter(item => {
				return item.fields.CategoryStr == 'Dell Digital Design';
			});
		},
		Workspace() {
			return this.items.filter(item => {
				return item.fields.CategoryStr == 'Workspace';
			});
		},
		Workflows() {
			return this.items.filter(item => {
				return item.fields.CategoryStr == 'Workflows & Processes';
			});
		},
		DesignTools() {
			return this.items.filter(item => {
				return item.fields.CategoryStr == 'Design Tools';
			});
		},
		DesignSystem() {
			return this.items.filter(item => {
				return item.fields.CategoryStr == 'Design System';
			});
		},
		Onboarding() {
			return this.items.filter(item => {
				return item.fields.CategoryStr == 'Onboarding';
			});
		},
		Other() {
			return this.items.filter(item => {
				return item.fields.CategoryStr == 'Other';
			});
		}
	}, // computed

	mounted: function () {
		this.loadItems();
		this.loadCategories();
	},
	methods: {

		loadItems: function () {

			// Init variables
			var self = this;
			var app_id = "appqkCHQ4G7q4mh7M";
			var app_key = "keyhHv75E3RaOkVX4";
			this.items = [];
			axios.get(
				"https://api.airtable.com/v0/" + app_id + "/Ideas?view=Grid%20view", {
				headers: {
					Authorization: "Bearer " + app_key
				}
			}
			).then(function (response) {
				self.items = response.data.records;
			}).catch(function (error) {
				console.log(error);
			});
		},
		// func 2
		loadCategories: function () {

			// Init variables
			var self = this;
			var app_id = "appqkCHQ4G7q4mh7M";
			var app_key = "keyhHv75E3RaOkVX4";
			this.categories = [];
			axios.get(
				"https://api.airtable.com/v0/" + app_id + "/Categories?view=Grid%20view", {
				headers: {
					Authorization: "Bearer " + app_key
				}
			}
			).then(function (response) {
				self.categories = response.data.records;
			}).catch(function (error) {
				console.log(error);
			});
		},
		// func ends
		//New post function

		newIdea: function () {
			// Init variables
			var self = this;
			var app_id = "appqkCHQ4G7q4mh7M";
			var app_key = "keyhHv75E3RaOkVX4";



			// This is how you post to a table in airtable
			// POST the data
			axios
				.post(
					"https://api.airtable.com/v0/" + app_id + "/Ideas?view=Grid%20view", {
					fields: {
						Idea: this.form.name,
						Description: this.form.description,
						Author: this.form.author,
						Category: [this.form.category],
						AuthorsEmail: this.authorsemail,
						Status: "Submitted"
						// ForIdea: [index] //index = Record id = template ID

						// Name: this.name,

					}
				}, {
					headers: {
						Authorization: "Bearer " + app_key
					}
				}
				)
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});

		}
		//end new post

	} // Methods end
}); // App ends