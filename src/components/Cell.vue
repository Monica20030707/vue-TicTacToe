<template>
  <div class="cell" @click="handleClick">
    {{ value }}
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
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  cursor: pointer;
}
</style>
