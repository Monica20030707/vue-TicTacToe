<template>
  <div class="cell" @click="handleClick">
    <img v-if="value === 'X'" src="../assets/x_symbol.png" alt="X" />
    <img v-if="value === 'O'" src="../assets/o_symbol.png" alt="O" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ value: string | null }>();
const emit = defineEmits<{(e: 'click'): void }>();

const handleClick = () => {
  emit('click');
};
</script>

<style scoped>
.cell {
  border: 0.4vw solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cell:hover {
  background-color: #f0f0f0;
  transform: scale(1.05);
}

.cell img {
  width: 4vw;
  height: 4vw;
}
</style>
