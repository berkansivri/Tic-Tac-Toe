<template>
  <div class="overlay">
    <div class="modal">
      <p class="winner" v-if="winner === 'o' || winner === 'x'">
        {{winner.toUpperCase()}} wins!
      </p>
      <p class="winner" v-else>
        It's a tie!
      </p>
      <p>
        Would you like to play again?
      </p>
      <button class="start x-color" @click="$emit('mark', 'x')">x</button>
      <button class="start o-color" @click="$emit('mark', 'o')">o</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["winner"]
}
</script>

<style>
.winner {
	font-size: 150%;
}

p {
	margin: 5px;
  font-size: 80%;
}
</style>