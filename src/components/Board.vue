<template>
  <div>
    <div class="container" :class="{ 'overlay-on': winner }">
      <loading
        :active.sync="isLoading"
        loader="dots"
        :opacity="0.3"
        color="#006633"
      ></loading>
      <div class="row" v-for="(row, i) in cells" :key="i">
        <Cell
          v-for="(col, j) in row"
          :key="j"
          @click="cellClicked(i, j)"
          :mark="col"
        />
      </div>
      <div class="hline line1"></div>
      <div class="hline line2"></div>
      <div class="vline line3"></div>
      <div class="vline line4"></div>
    </div>
    <Choice v-if="!user" @mark="selectMark" />
    <Winner v-if="winner" :winner="winner" @mark="selectMark" />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import Cell from './Cell'
import Choice from './Choice'
import Winner from './Winner'
import checkWin from '../util/checkWin'
import aiPlay, { aiAssign } from '../util/minimax'

export default {
  components: {
    Cell,
    Choice,
    Winner,
    Loading,
  },
  data() {
    return {
      cells: Array(3)
        .fill(null)
        .map(() => Array(3).fill(null)),
      user: null,
      comp: null,
      winner: null,
      isLoading: false,
    }
  },
  watch: {
    cells: {
      handler() {
        this.winner = checkWin(this.cells)
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    cellClicked(i, j) {
      if (!this.cells[i][j]) {
        this.$set(this.cells[i], j, this.user)
        this.isLoading = true
        // used nextTick because of wait `cells` watcher to set winner state
        this.$nextTick(() => {
          if (!this.winner)
            setTimeout(() => {
              const { i, j } = aiPlay()
              this.$set(this.cells[i], j, this.comp)
              this.isLoading = false
            }, 500)
        })
      }
    },
    selectMark(mark) {
      Object.assign(this.$data, this.$options.data()) //initial state
      aiAssign(this.cells, mark)
      this.user = mark
      this.comp = mark === 'x' ? 'o' : 'x'
      if (mark === 'o') {
        // first random play by AI
        this.$set(
          this.cells[~~(Math.random() * 3)],
          ~~(Math.random() * 3),
          this.comp
        )
      }
    },
  },
}
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

.vld-overlay {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
}

.vld-overlay.is-active {
  display: flex;
}

.vld-overlay.is-full-page {
  z-index: 9999;
  position: fixed;
}

.vld-overlay .vld-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  opacity: 0.5;
}

.vld-overlay .vld-icon,
.vld-parent {
  position: relative;
}
</style>
