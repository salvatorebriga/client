<template>
	<main class="pt-10 rounded-lg px-3">
		<h1>{{ apartment.title }}</h1>
	</main>
</template>

<script>
import axios from "../axios";
export default {
	name: "DetailsApartment",
	props: ["id"],
	data() {
		return {
			apartment: "",
		};
	},
	created() {
		this.fetchApartment();
	},
	methods: {
		async fetchApartment() {
			try {
				const response = await axios.get(`/apartments/${this.id}`);
				this.apartment = response.data;
				console.log(this.apartment);
			} catch (error) {
				console.error("Error fetching apartment:", error);
			}
		},
	},
};
</script>
