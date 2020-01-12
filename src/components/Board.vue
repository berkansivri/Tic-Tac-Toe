<template>
  <div class="container">
    <div class="row" v-for="(cell,i) in cells" :key="i">
      <Square v-for="(item, j) in cell" :key="j" @click.native="cellClicked(i, j)">
        {{item}}
      </Square>
    </div>
    <div class="hline line1"></div>
    <div class="hline line2"></div>
    <div class="vline line3"></div>
    <div class="vline line4"></div>
		<Choice v-if="!mark" @mark="mark = $event" />
  </div>
</template>

<script>
import Square from './Square'
import Choice from './Choice'
export default {
  components: {
		Square,
		Choice
  },
  data() {
    return {
			cells: Array(3).fill(null).map(() => Array(3).fill(null)),
			mark: null
    }
  },
  methods: {
    cellClicked(i, j) {
      console.log(i, j);
    }
  }
};
</script>

<style>
.cell {
	float: left;
	width: 150px;
	width: 30vmin;
	height: 150px;
	height: 30vmin;
	position: relative;
}

.x:before {
	position: absolute;
	top: 0;
	left: 75px;
	left: 15vmin;
	content: "";
	display: block;
	width: 7px;
	width: 1.5vmin;
	height: 150px;
	height: 30vmin;
	background-color: #10a0e1;
	border-radius: 5px;
	-webkit-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	transform: rotate(-45deg);
}

.x:after {
	position: absolute;
	top: 0;
	left: 75px;
	left: 15vmin;
	content: "";
	display: block;
	width: 7px;
	width: 1.5vmin;
	height: 150px;
	height: 30vmin;
	background-color: #10a0e1;
	border-radius: 5px;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}

.o {
	position: absolute;
	top: 15px;
	top: 3vmin;
	left: 15px;
	left: 3vmin;
	width: 120px;
	width: 24vmin;
	height: 120px;
	height: 24vmin;
	border: 8px solid #e110a0;
	border: 1.5vmin solid #e110a0;
	border-radius: 50%;
}

.hline {
	position: absolute;
	height: 5px;
	height: 1vmin;
	width: 440px;
	width: 88vmin;
	left: 5px;
	left: 1vmin;
	border-radius: 50px;
	background-color: #333;
}

.line1 {
	top: 147.5px;
	top: 29.5vmin;
}

.line2 {
	bottom: 147.5px;
	bottom: 29.5vmin;
}

.vline {
	position: absolute;
	width: 5px;
	width: 1vmin;
	height: 440px;
	height: 88vmin;
	top: 5px;
	top: 1vmin;
	border-radius: 50px;
	background-color: #333;
}

.line3 {
	left: 147.5px;
	left: 29.5vmin;
}

.line4 {
	right: 147.5px;
	right: 29.5vmin;
}

.pointer {
	cursor: pointer;
}



button {
	cursor: pointer;
	border-radius: 5px;
	margin: 10px;
	padding: 5px 20px 10px 20px;
	padding: 1vmin 4vmin 2vmin 4vmin;
	font-size: 300%;
	font-size: 10vmin;
	background-color: transparent;
	outline: none;
	border-style: solid;
	font-family: "PT Mono", sans;
}
button:hover {
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.overlay-on .container {
	-webkit-filter: blur(5px);
	filter: blur(5px);
}



.winner {
	font-size: 150%;
}

p {
	margin: 5px;
}
</style>