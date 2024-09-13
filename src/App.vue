<template>
	<div :class="{ 'dark': isDark }">
		<Header />
		<SearchResult />
		<ButtonDarkMode :isDark="isDark" @click="toggleDark" />
	</div>
</template>

<script>
import { useDark } from "@vueuse/core";
import Header from "./components/Header.vue";
import SearchResult from "./components/SearchResult.vue";
import ButtonDarkMode from "./components/ButtonDarkMode.vue";

export default {
	components: {
		Header,
		SearchResult,
		ButtonDarkMode,
	},
	data() {
		return {
			isDark: useDark(), // Returns a reactive object
		};
	},
	methods: {
		toggleDark() {
			this.isDark = !this.isDark;
		},
	},
};
</script>

<style lang="scss" scoped>
/* Styles for dark mode */
.dark {
	background-color: #121212;
	color: #e0e0e0;
}
</style>
