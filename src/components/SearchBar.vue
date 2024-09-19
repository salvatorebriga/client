<template>
	<div class="relative w-full">
		<div class="flex gap-8 justify-center text-2xl mb-5 font-medium">
			<h2
				class="transition-all duration-300 transform hover:scale-105 cursor-pointer"
			>
				Soggiorni
			</h2>
			<h2
				class="transition-all duration-300 transform hover:scale-105 cursor-pointer"
			>
				Esperienze
			</h2>
		</div>
		<!-- Contenitore dell'input -->
		<div
			class="transition-all duration-300 ease-in-out transform hover:scale-105"
		>
			<input
				v-model="query"
				@input="debouncedGetAutocomplete"
				id="address"
				class="block w-full border rounded-full shadow py-4 px-4 pr-12 text-black dark:bg-black dark:border-none dark:text-white"
				type="text"
				placeholder="Where do you want to go?"
				name="query"
				autocomplete="off"
			/>

			<!-- Pulsante di ricerca posizionato all'interno dell'input -->
			<div
				@click="search"
				class="absolute right-3 top-7 transform -translate-y-1/2 bg-airbnbcolor hover:bg-airbnbcolorhover rounded-full text-white font-bold p-2 dark:bg-indigo-600 hover:dark:bg-indigo-400 transition-all duration-300 cursor-pointer"
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

		<!-- Lista dei risultati di ricerca -->
		<ul
			v-if="searchResults.length > 0"
			id="searchResults"
			class="absolute w-full bg-white mt-1 rounded-lg shadow-lg overflow-hidden z-10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 transition-all duration-300"
		>
			<li
				v-for="(result, index) in searchResults"
				:key="index"
				@click="selectResult(result)"
				class="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-indigo-600 transition-all duration-300"
			>
				{{ result.address.freeformAddress }}
			</li>
		</ul>
	</div>
</template>

<script>
import axios from "../axios";
import { useDebounceFn } from "@vueuse/core";

export default {
	data() {
		return {
			query: "",
			searchResults: [],
			selected: false,
		};
	},
	created() {
		// Usa useDebounceFn di VueUse
		this.debouncedGetAutocomplete = useDebounceFn(this.getAutocomplete, 400);
	},

	computed: {
		isVisible() {
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
					this.$router.push({
						name: "advanced-search",
						query: { query: this.query },
					});
				}
			}
		},
		getAutocomplete() {
			if (this.query.length < 4) {
				this.searchResults = [];
				return;
			}
			this.selected = false;
			axios
				.get(`/autocomplete`, {
					params: { query: this.query },
				})
				.then((response) => {
					this.searchResults = response.data;
				})
				.catch((error) => {
					console.error("Errore:", error);
				});
		},
		selectResult(result) {
			this.query = result.address.freeformAddress;
			this.searchResults = [];
			this.selected = true;
		},
	},
};
</script>
