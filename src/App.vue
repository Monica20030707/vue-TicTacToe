<template>
  <div id="app">
    <Game />
    <footer>
      <p>Made by Monica Nguyen</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Game from './components/Game.vue';
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #8da2d5 0%, white 20%, white 80%, #df7777 100%);
  font-family: 'Coiny', cursive;
  font-size: 24px;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

footer {
  position: absolute;
  bottom: 10px;
  font-size: 16px;
}
</style>