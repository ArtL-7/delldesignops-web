/*jshint esversion: 6 */

Vue.component('card-component', {
	template: `
	<el-card class="box-card">
	<img :src="item['fields']['Avatar'][0]['url']" width="150">
	<h3>{{ item['fields']['User-Render'] }}</h3>
	<p>{{ item['fields']['Title-Render'] }}</p>
	<p>{{ item['fields']['Domain Render'] }}</p>
	
	
	<el-popover placement="bottom" width="900" trigger="click">
	
	<el-row>
	<el-col :span="6">
	<div class="">
	<img :src="item['fields']['Photo'][0]['url']" width="150"></div>
	</el-col>
	<el-col :span="18">
	<div class="" style="padding-right:6%">
	<h3>{{ item['fields']['User-Render'] }}</h3>
	<div style="margin-bottom:16px;">
	<span>{{ item['fields']['Title-Render'] }}</span>
	<el-divider direction="vertical"></el-divider>
	<span>{{ item['fields']['Office'] }}</span>
	</div>
	<p style="word-break: break-word;">
	{{ item['fields']['Bio'] }}
	</p>
	<p>
	<span style="font-weight: bold;">Current Project: </span>
	{{ item['fields']['Domain Render'] }}
	</p>
	</div>
	</el-col>
	</el-row>
	<el-divider content-position="left">Favorites</el-divider>
	
	<div style="display:inline-block">
	<span><span style="font-weight: bold;">Movie: </span>{{ item['fields']['Fun Fact: Movie'] }}</span>
	<el-divider direction="vertical"></el-divider>
	<span><span style="font-weight: bold;">TV:</span> {{ item['fields']['Fun Fact: TV Show'] }}</span>
	<el-divider direction="vertical"></el-divider>
	<span><span style="font-weight: bold;">Book: </span>{{ item['fields']['Fun Fact: Favorite Book'] }}</span>
	<el-divider direction="vertical"></el-divider>
	<span><span style="font-weight: bold;">Music: </span>{{ item['fields']['Fun Fact: Favorite Music'] }}</span>
	<el-divider direction="vertical"></el-divider>
	<span><span style="font-weight: bold;">Food: </span>{{ item['fields']['Fun Fact: Favorite Food'] }}</span>
	</div>
	
	<el-button slot="reference">View info</el-button>
	
	</el-popover>
	
	
	</el-card>
	`,
	props: {
		item: Object
	}, // end props
	data: function () {
		return {
			visible: false,

		};

	}, // end data
});



var app = new Vue({
	el: '#app',
	data: {
		designers: [],
		selecteddesigners: [],
		offices: [],
		roles: [],
		skills: [],
		products: [],

		selectedRole: '',
		selectedOffice: '',
		selectedSkill: '',
		selectedProduct: '',
		productLookup: ''
	}, // end data

	mounted: function () {
		this.loadDesigners();
		this.loadOffices();
		this.loadRoles();
		this.loadSkills();
		this.loadProducts();
	}, // end mounted


	methods: {
		//added by aury bwashi
		filterAll: function () {
			if (this.selectedRole != "") {
				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields["Title-Render"] == this.selectedRole;
					});
			}
			if (this.selectedOffice != "") {
				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields.Office == this.selectedOffice;
					});
			}
			if (this.selectedSkill != "") {
				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields["Areas of Expertise Render"].split(", ").includes(this.selectedSkill);
					});
			}
			if (this.selectedProduct != "") {
				this.productLookup = this.products.filter(product => {
					return product.fields.Name == this.selectedProduct;
				})[0].id;

				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields.Product.includes(this.productLookup);
					});
			}


			if (this.selectedRole != "" && this.selectedOffice != "") {
				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields["Title-Render"] == this.selectedRole;
					})
					.filter(designer => {
						return designer.fields.Office == this.selectedOffice;
					});
			}
			if (this.selectedRole != "" && this.selectedSkill != "") {
				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields["Title-Render"] == this.selectedRole;
					})
					.filter(designer => {
						return designer.fields["Areas of Expertise Render"].split(", ").includes(this.selectedSkill);
					});
			}
			if (this.selectedRole != "" && this.selectedProduct != "") {
				this.productLookup = this.products.filter(product => {
					return product.fields.Name == this.selectedProduct;
				})[0].id;

				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields["Title-Render"] == this.selectedRole;
					})
					.filter(designer => {
						return designer.fields.Product.includes(this.productLookup);
					});
			}
			if (this.selectedOffice != "" && this.selectedSkill != "") {
				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields.Office == this.selectedOffice;
					})
					.filter(designer => {
						return designer.fields["Areas of Expertise Render"].split(", ").includes(this.selectedSkill);
					});
			}
			if (this.selectedOffice != "" && this.selectedProduct != "") {
				this.productLookup = this.products.filter(product => {
					return product.fields.Name == this.selectedProduct;
				})[0].id;

				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields.Office == this.selectedOffice;
					})
					.filter(designer => {
						return designer.fields.Product.includes(this.productLookup);
					});
			}
			if (this.selectedSkill != "" && this.selectedProduct != "") {
				this.productLookup = this.products.filter(product => {
					return product.fields.Name == this.selectedProduct;
				})[0].id;

				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields["Areas of Expertise Render"].split(", ").includes(this.selectedSkill);
					})
					.filter(designer => {
						return designer.fields.Product.includes(this.productLookup);
					});
			}


			if (this.selectedOffice != "" && this.selectedRole != "" && this.selectedSkill != "") {
				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields.Office == this.selectedOffice;
					})
					.filter(designer => {
						return designer.fields["Title-Render"] == this.selectedRole;
					})
					.filter(designer => {
						return designer.fields["Areas of Expertise Render"].split(", ").includes(this.selectedSkill);
					});
			}
			if (this.selectedOffice != "" && this.selectedRole != "" && this.selectedProduct != "") {
				this.productLookup = this.products.filter(product => {
					return product.fields.Name == this.selectedProduct;
				})[0].id;

				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields.Office == this.selectedOffice;
					})
					.filter(designer => {
						return designer.fields["Title-Render"] == this.selectedRole;
					})
					.filter(designer => {
						return designer.fields.Product.includes(this.productLookup);
					});
			}
			if (this.selectedOffice != "" && this.selectedSkill != "" && this.selectedProduct != "") {
				this.productLookup = this.products.filter(product => {
					return product.fields.Name == this.selectedProduct;
				})[0].id;

				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields.Office == this.selectedOffice;
					})
					.filter(designer => {
						return designer.fields["Areas of Expertise Render"].split(", ").includes(this.selectedSkill);
					})
					.filter(designer => {
						return designer.fields.Product.includes(this.productLookup);
					});
			}
			if (this.selectedRole != "" && this.selectedSkill != "" && this.selectedProduct != "") {
				this.productLookup = this.products.filter(product => {
					return product.fields.Name == this.selectedProduct;
				})[0].id;

				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields["Title-Render"] == this.selectedRole;
					})
					.filter(designer => {
						return designer.fields["Areas of Expertise Render"].split(", ").includes(this.selectedSkill);
					})
					.filter(designer => {
						return designer.fields.Product.includes(this.productLookup);
					});
			}

			if (this.selectedOffice != "" && this.selectedRole != "" && this.selectedSkill != "" && this.selectedProduct != "") {
				this.productLookup = this.products.filter(product => {
					return product.fields.Name == this.selectedProduct;
				})[0].id;

				this.selecteddesigners = this.designers
					.filter(designer => {
						return designer.fields.Office == this.selectedOffice;
					})
					.filter(designer => {
						return designer.fields["Title-Render"] == this.selectedRole;
					})
					.filter(designer => {
						return designer.fields["Areas of Expertise Render"].split(", ").includes(this.selectedSkill);
					})
					.filter(designer => {
						return designer.fields.Product.includes(this.productLookup);
					});
			}


			return this.selecteddesigners;
		},
		resetAll: function () {
			this.selectedOffice = "";
			this.$refs.office.selectedLabel = "";

			this.selectedRole = "";
			this.$refs.role.selectedLabel = "";


			this.selectedSkill = "";
			this.$refs.skill.selectedLabel = "";

			this.selectedProduct = "";
			this.$refs.product.selectedLabel = "";

			this.selecteddesigners = this.designers;

			return this.selecteddesigners;
		},
		loadDesigners: function () {

			// Init variables
			var self = this;
			var app_id = "appyiQi6kViyZR8iT";
			var app_key = "keyhHv75E3RaOkVX4";
			this.designers = [];
			axios.get(
				"https://api.airtable.com/v0/" + app_id + "/DirectoryView?view=Grid%20view", {
				headers: {
					Authorization: "Bearer " + app_key
				}
			}
			).then(function (response) {
				self.designers = response.data.records;
				self.selecteddesigners = response.data.records;
			}).catch(function (error) {
				console.log(error);
			});


		}, // end load designers
		loadOffices: function () {
			var self = this;
			var app_id = "appyiQi6kViyZR8iT";
			var app_key = "keyhHv75E3RaOkVX4";
			this.offices = [];
			axios.get(
				"https://api.airtable.com/v0/" + app_id + "/Locations?view=Grid%20view", {
				headers: {
					Authorization: "Bearer " + app_key
				}
			}
			).then(function (response) {
				self.offices = response.data.records;
			}).catch(function (error) {
				console.log(error);
			});


		},
		loadRoles: function () {

			// Init variables
			var self = this;
			var app_id = "appyiQi6kViyZR8iT";
			var app_key = "keyhHv75E3RaOkVX4";
			this.roles = [];
			axios.get(
				"https://api.airtable.com/v0/" + app_id + "/Roles?view=Grid%20view", {
				headers: {
					Authorization: "Bearer " + app_key
				}
			}
			).then(function (response) {
				self.roles = response.data.records;
			}).catch(function (error) {
				console.log(error);
			});


		}, // end load roles

		loadSkills: function () {

			// Init variables
			var self = this;
			var app_id = "appyiQi6kViyZR8iT";
			var app_key = "keyhHv75E3RaOkVX4";
			this.skills = [];
			axios.get(
				"https://api.airtable.com/v0/" + app_id + "/Skills?view=Grid%20view", {
				headers: {
					Authorization: "Bearer " + app_key
				}
			}
			).then(function (response) {
				self.skills = response.data.records;
			}).catch(function (error) {
				console.log(error);
			});


		}, // end load skills

		loadProducts: function () {

			// Init variables
			var self = this;
			var app_id = "appyiQi6kViyZR8iT";
			var app_key = "keyhHv75E3RaOkVX4";
			this.products = [];
			axios.get(
				"https://api.airtable.com/v0/" + app_id + "/Products?view=Grid%20view", {
				headers: {
					Authorization: "Bearer " + app_key
				}
			}
			).then(function (response) {
				self.products = response.data.records;
			}).catch(function (error) {
				console.log(error);
			});
		} // end load products
	} // functions end
}); // App ends