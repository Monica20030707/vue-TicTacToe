<template>
  <div class="board">
    <Cell v-for="(cell, index) in board" :key="index" :value="cell" @click="handleClick(index)" />
  </div>
</template>

<script setup lang="ts">
import Cell from './Cell.vue';

defineProps<{ board: (string | null)[] }>();
const emit = defineEmits<{(e: 'cell-click', index: number): void }>();

const handleClick = (index: number) => {
  emit('cell-click', index);
};
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 10vw);
  grid-template-rows: repeat(3, 10vw);
  gap: 1vw;
}
</style>
