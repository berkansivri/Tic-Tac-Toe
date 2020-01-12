<template>
	<div id="app">
		<Board></Board>
	</div>
</template>

<script>
import Board from "./components/Board";
export default {
	name: "app",
	components: {
		Board
	}
};
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

html {
	box-sizing: border-box;
}

*,
*:before,
*:after {
	box-sizing: inherit;
}

body {
	background-color: #e5e5e5;
}

.container {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 450px;
	width: 90vmin;
	height: 450px;
	height: 90vmin;
	margin: auto;
	background-color: #e5e5e5;
}

.row {
	height: 150px;
	height: 30vmin;
}
</style>
