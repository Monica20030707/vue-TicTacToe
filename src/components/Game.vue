<template>
  <div class="game">
    <h1 class="bouncing-text">Tic-Tac-Toe</h1>
    <div class="game-mode">
      <button @click="setGameMode('pvp')" :class="{ active: gameMode === 'pvp' }" class="bouncing-button">Player vs Player</button>
      <button @click="setGameMode('pvai')" :class="{ active: gameMode === 'pvai' }" class="bouncing-button">Player vs AI</button>
    </div>
    <Board :board="board" @cell-click="handleCellClick" />
    <div v-if="winner" class="winner-message">
      <p v-if="winner === 'draw'">It's a draw!</p>
      <p v-else>Player {{ winner }} wins!</p>
      <button @click="resetGame" class="bouncing-button">Play Again</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
  setTimeout(() => {
    const availableCells = board.value
      .map((cell, index) => (cell === null ? index : null))
      .filter(index => index !== null);

    if (availableCells.length > 0) {
      const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)] as number;
      handleCellClick(randomIndex);
    }
  }, 1000);
};
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bouncing-text {
  animation: bounce 2s infinite;
}

.bouncing-button {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.game-mode {
  margin-bottom: 2vh;
}

.game-mode button {
  margin: 0 1vw;
  padding: 1.5vh 3vw;
  border: none;
  border-radius: 2.5vh;
  cursor: pointer;
  background-color: #f0f0f0;
  color: #333;
  font-size: 2.2vh;
  transition: all 0.3s ease;
  font-family: 'Coiny', cursive;
}

.game-mode button.active {
  background-color: #4CAF50;
  color: white;
  transform: scale(1.1);
}

.winner-message {
  margin-top: 2vh;
  text-align: center;
}

.winner-message p {
  font-size: 4.8vh;
  margin-bottom: 1vh;
}

.winner-message button {
  padding: 1.5vh 3vw;
  border: none;
  border-radius: 2.5vh;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  font-size: 2.2vh;
  margin-top: 1vh;
  transition: all 0.3s ease;
  font-family: 'Coiny', cursive;
}
</style>
