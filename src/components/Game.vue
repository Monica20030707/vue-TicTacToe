<template>
  <div class="game">
    <h1>Tic-Tac-Toe</h1>
    <div class="game-mode">
      <button @click="setGameMode('pvp')" :class="{ active: gameMode === 'pvp' }">Player vs Player</button>
      <button @click="setGameMode('pvai')" :class="{ active: gameMode === 'pvai' }">Player vs AI</button>
    </div>
    <Board :board="board" @cell-click="handleCellClick" />
    <div v-if="winner" class="winner-message">
      <p v-if="winner === 'draw'">It's a draw!</p>
      <p v-else>Player {{ winner }} wins!</p>
      <button @click="resetGame">Play Again</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Board from './Board.vue';

const gameMode = ref('pvp');
const board = ref(Array(9).fill(null));
const currentPlayer = ref('X');
const winner = ref<string | null>(null);

const setGameMode = (mode: 'pvp' | 'pvai') => {
  gameMode.value = mode;
  resetGame();
};

const handleCellClick = (index: number) => {
  if (board.value[index] || winner.value) {
    return;
  }

  board.value[index] = currentPlayer.value;
  if (checkWinner()) {
    winner.value = currentPlayer.value;
    return;
  }

  if (board.value.every(cell => cell)) {
    winner.value = 'draw';
    return;
  }

  currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';

  if (gameMode.value === 'pvai' && currentPlayer.value === 'O') {
    aiMove();
  }
};

const checkWinner = () => {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]) {
      return true;
    }
  }
  return false;
};

const resetGame = () => {
  board.value = Array(9).fill(null);
  currentPlayer.value = 'X';
  winner.value = null;
};

const aiMove = () => {
  const availableCells = board.value
    .map((cell, index) => (cell === null ? index : null))
    .filter(index => index !== null);

  if (availableCells.length > 0) {
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)] as number;
    handleCellClick(randomIndex);
  }
};
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
}

.game-mode {
  margin-bottom: 20px;
}

.game-mode button {
  margin: 0 10px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.game-mode button.active {
  background-color: #4CAF50;
  color: white;
}

.winner-message {
  margin-top: 20px;
  text-align: center;
}

.winner-message p {
  font-size: 24px;
  margin-bottom: 10px;
}

.winner-message button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>
