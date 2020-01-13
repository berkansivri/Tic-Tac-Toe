<template>
	<div>
		<div class="container" :class="{'overlay-on': winner}">
			<div class="row" v-for="(row,i) in cells" :key="i">
				<Cell v-for="(col, j) in row" :key="j" 
							@click.native="cellClicked(i, j)" 
							:mark="col"
				/>
			</div>
			<div class="hline line1"></div>
			<div class="hline line2"></div>
			<div class="vline line3"></div>
			<div class="vline line4"></div>
		</div>
		<Choice v-if="!user" @mark="selectMark" />
		<Winner v-if="winner" :winner="winner" @mark="selectMark"/>
	</div>
</template>

<script>
import Cell from './Cell'
import Choice from './Choice'
import Winner from './Winner'
import checkWin from '../util/checkWin'
import play, { aiAssign } from '../util/minimax'

export default {
  components: {
		Cell,
		Choice,
		Winner
  },
  data() {
    return {
			cells: Array(3).fill(null).map(() => Array(3).fill(null)),
			user: null,
			comp: null,
			winner: null
    }
	},
	watch: {
		cells: {
			handler() {
				this.winner = checkWin(this.cells)
			},
			deep: true,
			immediate: true
		}
	},
  methods: {
    cellClicked(i, j) {
			if(!this.cells[i][j]) {
        this.$set(this.cells[i], j, this.user)
        // used nextTick because of wait `cells` watcher to set winner state
				this.$nextTick(() => { 
					if(!this.winner)
						this.aiPlay()
				})
			}
		},
		selectMark(mark) {
			Object.assign(this.$data, this.$options.data()) //initial state
			aiAssign(this.cells, mark)
			this.user = mark
			this.comp = (mark === "x") ? "o" : "x"
			if(mark === "o") {
        // first random play by AI
        this.$set(this.cells[~~(Math.random() * 3)], ~~(Math.random() * 3), this.comp)
      }
		},
		aiPlay() {
			const { i, j } = play()
			this.$set(this.cells[i], j, this.comp)
		}
  }
};
</script>

<style>
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

.overlay-on {
	-webkit-filter: blur(5px);
	filter: blur(5px);
}
</style>