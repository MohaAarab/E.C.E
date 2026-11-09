
import { setHistoryGames } from "./ui-history.js";
import { getActivePlayer } from "./players.js";
import { readFromStorage, writeToStorage } from "./storage.js";

const HISTORY_KEY = "gameHistory";

const playerName = document.querySelector("#player-name");
const historyList = document.querySelector("#history-list");

// Load saved games
let historyGames = readFromStorage(HISTORY_KEY) || [];

// Display active player
function displayActivePlayer() {
  const player = getActivePlayer();

  if (player) {
    playerName.textContent = player.nickname;
  } else {
    playerName.textContent = "Aucun joueur sélectionné";
  }
}

// Delete a game
function deleteGame(event) {
  const button = event.target.closest(".delete-game");

  if (!button) return;

  const id = Number(button.dataset.id);

  const index = historyGames.findIndex((game) => game.id === id);

  if (index === -1) return;

  historyGames.splice(index, 1);

  writeToStorage(HISTORY_KEY, historyGames);

  setHistoryGames(historyGames);
}

// Initialize history page
function initHistory() {
  displayActivePlayer();

  setHistoryGames(historyGames);

  historyList.addEventListener("click", deleteGame);
}

initHistory();
