<template>
	<main class="pt-10 rounded-lg px-3">
		<div
			class="container mx-auto bg-white dark:text-white shadow dark:bg-gray-800 rounded-lg pt-6 pb-6"
		>
			<!-- Titolo della ricerca -->
			<div class="px-6 pt-6 pb-6">
				<h2 class="font-bold text-2xl">Risultati della ricerca</h2>
				<p class="text-lg">
					Hai cercato: <span class="font-semibold">{{ searchQuery }}</span> con
					un raggio di <span class="font-semibold">{{ searchRadius }} km</span>
				</p>
			</div>

			<!-- Sezione per la ricerca con campo per il raggio, stanze e servizi -->
			<div class="px-6 py-4">
				<div class="flex flex-col md:flex-row gap-0 md:gap-2">
					<!-- Campo per il filtro dell'indirizzo -->
					<div class="flex-1">
						<div class="relative w-full">
							<input
								v-model="searchQuery"
								@input="getAutocomplete"
								type="text"
								id="query"
								class="block border border-gray-300 rounded-t md:rounded-l md:rounded-tr-none p-2 w-full mb-2 text-black dark:bg-gray-900 dark:border-none dark:text-white focus:outline-none"
								placeholder="Indirizzo"
							/>
							<ul
								v-if="searchResults.length > 0"
								id="searchResults"
								class="absolute w-full bg-white mt-1 rounded-lg shadow-lg overflow-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 z-20"
							>
								<li
									v-for="(result, index) in searchResults"
									:key="index"
									@click="selectResult(result)"
									class="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-indigo-600 z-20"
								>
									{{ result.address.freeformAddress }}
								</li>
							</ul>
						</div>
					</div>

					<!-- Campo per il filtro del raggio -->
					<div class="flex-1">
						<input
							v-model="searchRadius"
							type="number"
							id="radius"
							class="border border-gray-300 rounded-none p-2 w-full mb-2 text-black dark:bg-gray-900 dark:border-none dark:text-white focus:outline-none"
							placeholder="Distanza in km"
						/>
					</div>

					<!-- Campo per il filtro del numero minimo di stanze -->
					<div class="flex-1">
						<input
							v-model="minRooms"
							type="number"
							id="minRooms"
							class="border border-gray-300 rounded-none p-2 w-full mb-2 text-black dark:bg-gray-900 dark:border-none dark:text-white focus:outline-none"
							placeholder="Numero minimo di stanze"
						/>
					</div>
					<div class="relative flex-1">
						<!-- Bottone per aprire il menu a tendina -->
						<button
							@click="toggleDropdown"
							class="border border-gray-300 rounded-b md:rounded-r md:rounded-bl-none p-2 w-full text-left flex items-center justify-between dark:border-none dark:bg-gray-900 dark:text-white"
						>
							Seleziona Servizi
							<span class="ml-2">&#9662;</span>
							<!-- Icona per indicare il dropdown -->
						</button>

						<!-- Menu a tendina -->
						<div
							v-if="dropdownOpen"
							class="absolute z-10 bg-white border dark:bg-gray-900 dark:border-gray-800 rounded-md shadow-lg mt-2 p-4 w-full"
						>
							<div
								v-for="service in availableServices"
								:key="service.id"
								class="flex items-center mb-2"
							>
								<input
									type="checkbox"
									:value="service.name"
									v-model="selectedServices"
									class="mr-2"
								/>
								<label>{{ service.name }}</label>
							</div>
							<!-- Bottone per chiudere il menu -->
							<button
								@click="toggleDropdown"
								class="mt-2 bg-airbnbcolor hover:bg-airbnbcolorhover dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-4 py-2 rounded"
							>
								Conferma
							</button>
						</div>
					</div>
				</div>

				<!-- Pulsante per aggiornare la ricerca -->
				<button
					@click="fetchResults"
					class="bg-airbnbcolor hover:bg-airbnbcolorhover dark:bg-indigo-600 hover:dark:bg-indigo-700 text-white px-4 py-2 rounded mt-4"
				>
					Aggiorna ricerca
				</button>
			</div>

			<hr class="p-0 border border-gray-200 dark:border-gray-950" />

			<!-- Corpo della pagina -->
			<div class="px-6 pt-4">
				<!-- Mostra messaggio di caricamento (opzionale) -->
				<div v-if="loading" class="text-gray-500 mt-6">Caricamento...</div>

				<!-- Mostra i risultati se presenti -->
				<div
					v-else-if="results && results.length > 0"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
				>
					<AdvancedCard
						v-for="apartment in results"
						:key="apartment.id"
						:img="apartment.img"
						:title="apartment.title"
						:address="apartment.address"
						:host="`${apartment.user.name} ${apartment.user.surname}`"
						:rooms="apartment.rooms"
						:beds="apartment.beds"
						:isAvailable="apartment.is_available"
					/>
				</div>

				<!-- Mostra messaggio se nessun risultato trovato -->
				<div
					v-else-if="!loading && results.length === 0"
					class="text-red-500 mt-6"
				>
					Nessun risultato trovato
				</div>

				<!-- Mostra messaggio di errore se presente -->
				<div v-if="error" class="text-red-500 mt-6">
					Si è verificato un errore durante la ricerca: {{ error }}
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import axios from "../axios";
import AdvancedCard from "../components/AdvancedCard.vue";

export default {
	name: "AdvancedSearch",
	components: {
		AdvancedCard,
	},
	data() {
		return {
			dropdownOpen: false,
			searchQuery: this.$route.query.query || "",
			searchRadius: this.$route.query.radius || 20,
			minRooms: this.$route.query.min_rooms || 1,
			selectedServices: [],
			availableServices: [],
			results: [],
			error: null,
			loading: true,
			searchResults: [],
			selected: false, // Stato che traccia se è stato selezionato un suggerimento nell'autocompletamento dell'input
		};
	},
	created() {
		this.fetchAvailableServices();
		this.fetchResults();
	},
	watch: {
		searchQuery(newQuery) {
			this.fetchResults();
		},
		searchRadius(newRadius) {
			this.fetchResults();
		},
		minRooms(newMinRooms) {
			this.fetchResults();
		},
		selectedServices(newServices) {
			this.fetchResults();
		},
	},
	methods: {
		async fetchResults() {
			this.error = null;
			this.results = [];
			this.loading = true;

			if (this.searchQuery) {
				try {
					// Costruisci la query string
					let query = `/search?query=${encodeURIComponent(
						this.searchQuery
					)}&radius=${this.searchRadius}&min_rooms=${this.minRooms}`;

					// Aggiungi il parametro dei servizi solo se ci sono servizi selezionati
					if (this.selectedServices.length > 0) {
						query += `&services[]=${this.selectedServices.join(
							"&services[]="
						)}`;
					}

					const response = await axios.get(query);
					this.results = response.data;
					console.log(this.results);
				} catch (error) {
					console.error("Errore nel fetch:", error);
					this.error =
						"Si è verificato un errore durante la ricerca. Riprova più tardi.";
				} finally {
					this.loading = false;
				}
			} else {
				this.loading = false;
			}
		},

		async fetchAvailableServices() {
			try {
				const response = await axios.get("/search/services");
				this.availableServices = response.data;
			} catch (error) {
				console.error("Errore nel fetch dei servizi:", error);
				this.error = "Impossibile caricare i servizi disponibili.";
			}
		},

		toggleDropdown() {
			this.dropdownOpen = !this.dropdownOpen; // Mostra/nascondi il dropdown
		},
		//TomTom Autocomplete
		getAutocomplete() {
			if (this.searchQuery.length < 4) {
				this.searchResults = []; // Svuota i risultati se la searchQuery è troppo breve
				return;
			}
			this.selected = false;
			axios
				.get(`/autocomplete`, {
					params: { query: this.searchQuery },
				})
				.then((response) => {
					this.searchResults = response.data; // Aggiorna i risultati
				})
				.catch((error) => {
					console.error("Errore:", error);
				});
		},
		selectResult(result) {
			this.searchQuery = result.address.freeformAddress; // Imposta l'indirizzo selezionato nell'input
			this.searchResults = []; // Svuota i risultati dopo la selezione
			this.selected = true;
		},
	},
};
</script>
