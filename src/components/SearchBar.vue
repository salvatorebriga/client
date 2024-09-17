<template>
	<div v-if="isVisible" class="flex gap-3 flex-grow">
		<div class="relative w-full">
			<input
				v-model="query"
				@input="getAutocomplete"
				id="address"
				class="block w-full border rounded-full shadow p-2 px-4 flex-grow text-black dark:bg-gray-900 dark:border-none dark:text-white"
				type="text"
				placeholder="Comincia a cercare"
				name="query"
				autocomplete="off"
			/>
			<ul
				v-if="searchResults.length > 0"
				id="searchResults"
				class="absolute w-full bg-white mt-1 rounded-lg shadow-lg overflow-hidden z-10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
			>
				<li
					v-for="(result, index) in searchResults"
					:key="index"
					@click="selectResult(result)"
					class="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-indigo-600"
				>
					{{ result.address.freeformAddress }}
				</li>
			</ul>
		</div>

		<div
			@click="search"
			class="cursor-pointer bg-airbnbcolor hover:bg-airbnbcolorhover rounded-full text-white font-bold flex items-center p-2 px-3 dark:bg-indigo-600 hover:dark:bg-indigo-700"
			:disable="!selected"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
				/>
			</svg>
		</div>
	</div>
</template>

<script>
import axios from "../axios";

export default {
	data() {
		return {
			query: "",
			searchResults: [],
			selected: false, // Stato che traccia se è stato selezionato un suggerimento nell'autocompletamento dell'input
		};
	},
	computed: {
		isVisible() {
			// Controlla se la route attuale è '/advanced-search'
			return (
				this.$route.name !== "advanced-search" &&
				this.$route.name !== "details-apartment"
			);
		},
	},
	methods: {
		search() {
			if (this.selected) {
				if (this.query) {
					// Naviga alla pagina advanced-search con il parametro 'query'
					this.$router.push({
						name: "advanced-search",
						query: { query: this.query },
					});
				}
			}
		},
		//TomTom Autocomplete
		getAutocomplete() {
			if (this.query.length < 4) {
				this.searchResults = []; // Svuota i risultati se la query è troppo breve
				return;
			}
			this.selected = false;
			axios
				.get(`/autocomplete`, {
					params: { query: this.query },
				})
				.then((response) => {
					this.searchResults = response.data; // Aggiorna i risultati
				})
				.catch((error) => {
					console.error("Errore:", error);
				});
		},
		selectResult(result) {
			this.query = result.address.freeformAddress; // Imposta l'indirizzo selezionato nell'input
			this.searchResults = []; // Svuota i risultati dopo la selezione
			this.selected = true;
		},
	},
};
</script>
