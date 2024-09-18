<template>
	<main
		class="container mx-auto pt-10 rounded-lg dark:bg-gray-900 dark:text-white"
	>
		<div class="bg-white dark:bg-gray-800 rounded-lg p-6">
			<h1 class="w-full text-2xl font-bold mb-5">{{ apartment.title }}</h1>
			<!-- Immagine a Sinistra -->
			<div class="flex gap-6 mb-5">
				<div class="flex-shrink-0 w-2/3">
					<img
						:src="imageUrl"
						alt="Apartment Image"
						class="w-full h-auto rounded-lg shadow-md"
					/>
				</div>
				<!-- Descrizione a Destra -->
				<div class="w-1/3">
					<p class="text-lg mb-2">
						<strong>Address:</strong> {{ apartment.address }}
					</p>
					<!-- Nome e cognome, v-if per risolvere errore in console -->
					<p class="text-lg mb-2" v-if="apartment.user">
						<strong>Host:</strong> {{ apartment.user.name }}
						{{ apartment.user.surname }}
					</p>
					<p class="text-lg mb-2">
						<strong>Rooms:</strong> {{ apartment.rooms }}
					</p>
					<p class="text-lg mb-2">
						<strong>Beds:</strong> {{ apartment.beds }}
					</p>
					<p class="text-lg mb-2">
						<strong>Available:</strong>
						{{ apartment.is_available ? "Yes" : "No" }}
					</p>
				</div>
			</div>

			<!-- form messaggio -->
			<div class="w-2/3">
				<form
					@submit.prevent="sendMessage"
					method="POST"
					enctype="multipart/form-data"
				>
					<!-- Name -->
					<div class="grid grid-cols-2 gap-4 mb-4">
						<div class="mb-4">
							<label
								for="name"
								class="block font-medium text-sm text-gray-700 dark:text-gray-300 py-2"
								>Name
							</label>
							<input
								v-model="formData.name"
								id="name"
								class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
								type="text"
								name="name"
								required
								autofocus
							/>
						</div>

						<!-- Surname -->
						<div class="mb-4">
							<label
								for="surname"
								class="block font-medium text-sm text-gray-700 dark:text-gray-300 py-2"
							>
								Surname
							</label>
							<input
								v-model="formData.surname"
								id="surname"
								class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
								type="text"
								name="surname"
								required
								autofocus
							/>
						</div>
					</div>
					<!-- Email -->
					<div class="mb-4">
						<label
							for="email"
							class="block font-medium text-sm text-gray-700 dark:text-gray-300 py-2"
						>
							Email:
						</label>
						<input
							v-model="formData.email"
							id="email"
							class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
							type="email"
							name="email"
							required
							autofocus
						/>
					</div>
					<!-- Messagge -->
					<div class="mb-4">
						<label
							for="message"
							class="block font-medium text-sm text-gray-700 dark:text-gray-300 py-2"
						>
							Messagge:
						</label>
						<textarea
							v-model="formData.message"
							id="message"
							class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
							name="message"
							required
							autofocus
						/>
					</div>
					<!-- Submit Button -->
					<button
						type="submit"
						class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
					>
						Send Message
					</button>
				</form>
			</div>
		</div>
	</main>
</template>

<script>
import axios from "../axios";

export default {
	name: "DetailsApartment",
	data() {
		return {
			apartment: {},
			formData: {
				name: "",
				surname: "",
				email: "",
				message: "",
			},
		};
	},
	computed: {
		imageUrl() {
			return `http://127.0.0.1:8000/storage/${this.apartment.img}`;
		},
	},
	async created() {
		this.fetchApartment();
	},
	methods: {
		async fetchApartment() {
			try {
				const response = await axios.get(
					`/apartments/${this.$route.params.id}`
				);
				this.apartment = response.data;
			} catch (error) {
				console.error("Error fetching apartment:", error);
			}
		},
		async sendMessage() {
			try {
				// Endpoint per la tua API back-end
				const response = await axios.post("/message", this.formData);
				console.log("Dati inviati:", response.data);
			} catch (error) {
				console.error("Errore durante l’invio dei dati:", error);
			}
		},
	},
};
</script>

<style scoped>
/* Optional: Custom styles for image and text alignment */
</style>
