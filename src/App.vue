<template>
	<div>
		<router-view></router-view>
		<ButtonDarkMode :isDark="isDark" @click="toggleDark" />
	</div>
</template>

<script>
import { useDark } from "@vueuse/core";
import ButtonDarkMode from "./components/ButtonDarkMode.vue";

export default {
	components: {
		ButtonDarkMode,
	},
	data() {
		return {
			isDark: useDark(), // Returns a reactive object
		};
	},
	// created() {
	//   console.log(this.isDark);
	// },
	methods: {
		toggleDark() {
			this.isDark = !this.isDark;
			// console.log(this.isDark);
		},
	},
};
</script>

<style lang="scss" scoped></style>
